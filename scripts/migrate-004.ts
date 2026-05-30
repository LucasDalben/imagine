import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../apps/mobile/.env') });

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Extract project ref from URL: https://{ref}.supabase.co
const projectRef = supabaseUrl.replace('https://', '').split('.')[0];

const sql = `
  ALTER TABLE public.stories
    ADD COLUMN IF NOT EXISTS image_good_final  text,
    ADD COLUMN IF NOT EXISTS image_false_final text;
`;

async function runViaManagementApi(token: string) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Management API (${res.status}): ${text}`);
  return text;
}

(async () => {
  console.log('Running migration 004: add ending image columns...');

  const token = accessToken ?? serviceRoleKey;
  try {
    const result = await runViaManagementApi(token);
    console.log('Migration 004 complete.', result);
  } catch (err) {
    console.error((err as Error).message);
    console.error('\n--- Manual fallback ---');
    console.error('Add your Supabase Personal Access Token to apps/mobile/.env:');
    console.error('  SUPABASE_ACCESS_TOKEN=sbp_xxxx...');
    console.error('Then re-run:  npm run migrate:004');
    console.error('\nOr run this SQL directly in the Supabase SQL Editor:');
    console.error(sql);
    process.exit(1);
  }
})();
