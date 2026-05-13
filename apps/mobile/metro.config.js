const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for pnpm + Metro on Windows: ignore temp directories created during pnpm operations
const existing = config.resolver.blockList;
const existingList = Array.isArray(existing) ? existing : existing ? [existing] : [];
config.resolver.blockList = [
  ...existingList,
  /node_modules[/\\]\.pnpm[/\\].*_tmp_\d+_\d+.*/,
];

module.exports = config;
