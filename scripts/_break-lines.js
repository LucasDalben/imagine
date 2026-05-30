const fs = require('fs');
const content = fs.readFileSync('scripts/seed-caju-story.ts', 'utf8');
const lines = content.split('\n');
const MAX = 100;
const CHUNK = 80;
const result = [];

for (const line of lines) {
  if (line.length <= MAX) {
    result.push(line);
    continue;
  }

  // Match: <indent><key>: '<value>', or <indent><key>: "<value>",
  const m = line.match(/^(\s*)(\w+):\s*(['"`])([\s\S]*)\3(,?)$/);
  if (!m) {
    result.push(line);
    continue;
  }

  const [, indent, key, quote, value, comma] = m;

  // Skip if the value contains the same quote (would break concat)
  if (value.includes(quote)) {
    result.push(line);
    continue;
  }

  const words = value.split(' ');
  const chunks = [];
  let cur = '';

  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (next.length > CHUNK && cur) {
      chunks.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) chunks.push(cur);

  if (chunks.length <= 1) {
    result.push(line);
    continue;
  }

  const cont = indent + '  ';
  result.push(indent + key + ': ' + quote + chunks[0] + quote + ' +');
  for (let i = 1; i < chunks.length - 1; i++) {
    result.push(cont + quote + chunks[i] + quote + ' +');
  }
  result.push(cont + quote + chunks[chunks.length - 1] + quote + comma);
}

fs.writeFileSync('scripts/seed-caju-story.ts', result.join('\n'));
console.log('Done. Lines before:', lines.length, '| Lines after:', result.length);
