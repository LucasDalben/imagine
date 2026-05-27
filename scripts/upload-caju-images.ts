import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../apps/mobile/.env') });

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY in apps/mobile/.env');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY in apps/mobile/.env');
  console.error('Get it from: Supabase Dashboard → Settings → API → service_role');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET = 'stories';
const IMAGES_DIR = path.resolve(__dirname, 'image-storys/caju');
const STORY_SLUG = 'o-grande-dia-do-caju';

async function ensureBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error('Could not list buckets:', listError.message);
    process.exit(1);
  }

  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (createError) {
      console.error('Could not create bucket:', createError.message);
      process.exit(1);
    }
    console.log(`Bucket "${BUCKET}" created.\n`);
  }
}

async function uploadImages() {
  await ensureBucket();

  const files = fs.readdirSync(IMAGES_DIR).filter((f) => /\.(webp|png|jpg|jpeg)$/i.test(f));

  if (files.length === 0) {
    console.error('No images found in', IMAGES_DIR);
    process.exit(1);
  }

  console.log(`Found ${files.length} images. Uploading to bucket "${BUCKET}"...\n`);

  const results: { pageNumber: number; fileName: string; url: string }[] = [];

  for (const fileName of files) {
    const match = fileName.match(/page[_-](\d+)/i);
    if (!match) {
      console.warn(`  Skipping "${fileName}" — could not parse page number`);
      continue;
    }

    const pageNumber = parseInt(match[1], 10);
    const ext = path.extname(fileName);
    const storagePath = `${STORY_SLUG}/page-${pageNumber}${ext}`;
    const filePath = path.join(IMAGES_DIR, fileName);
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      console.error(`  ❌ page ${pageNumber} — ${error.message}`);
      continue;
    }

    const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    const url = publicUrlData.publicUrl;

    results.push({ pageNumber, fileName, url });
    console.log(`  ✅ page ${pageNumber} → ${url}`);
  }

  console.log('\n--- Summary ---');
  console.log(`Uploaded: ${results.length}/${files.length}`);

  if (results.length > 0) {
    console.log('\n--- image_url map (paste into seed script) ---');
    results.sort((a, b) => a.pageNumber - b.pageNumber);
    const map: Record<number, string> = {};
    for (const r of results) {
      map[r.pageNumber] = r.url;
    }
    console.log(JSON.stringify(map, null, 2));
  }
}

uploadImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
