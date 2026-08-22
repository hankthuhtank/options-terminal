#!/usr/bin/env node
/* Dependency-free repository integrity checks for TradeSchool. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
/* V15: validate the SAME stack index.html loads, in the same order. Validating
   only the base four gave false failures for assets the later media layer had
   already remapped, and would have missed anything the later layers break. */
const LOAD_ORDER = [
  'js/content/base-data.js',
  'js/content/electrical.js',
  'js/content/hvac-plumbing.js',
  'js/content/industrial-welding-construction.js',
  'js/content/v8-overrides.js',
  'js/content/v10-visuals.js',
  'js/content/v14-media-fill.js',
  'js/content/v15-media.js',
  'js/content/v15-currency.js',
  'js/content/v15-deboilerplate.js'
];
context.console = { log(){}, warn(){}, error(){} };
for (const rel of LOAD_ORDER) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), context, { filename: rel });
}

const D = context.window.TRADE_DATA;
const concepts = D.concepts || [];
const ids = new Set();
const problems = [];
for (const c of concepts) {
  if (!c.id) problems.push('Concept missing id');
  else if (ids.has(c.id)) problems.push(`Duplicate concept id: ${c.id}`);
  else ids.add(c.id);
}
for (const c of concepts) {
  for (const r of c.related || []) if (!ids.has(r)) problems.push(`Broken related link: ${c.id} -> ${r}`);
}
for (const [id, asset] of Object.entries(D.visualAssets || {})) {
  if (!asset?.src || /^https?:/.test(asset.src)) continue;
  if (!fs.existsSync(path.join(root, asset.src))) problems.push(`Missing visual asset for ${id}: ${asset.src}`);
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const rel of LOAD_ORDER) {
  if (!html.includes(rel)) problems.push(`index.html does not load ${rel} (validator and page would disagree)`);
}
if (/<script[^>]*v13-modernity\.js/.test(html)) problems.push('v13-modernity.js is loaded again: it writes to c.deep.*, which nothing renders');

const app = fs.readFileSync(path.join(root, 'js/core/app.js'), 'utf8');
for (const m of app.matchAll(/assets\/(?:hero|reference)\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp)/g)) {
  if (!fs.existsSync(path.join(root, m[0]))) problems.push(`Missing UI asset: ${m[0]}`);
}

if (problems.length) {
  console.error(`TradeSchool validation failed (${problems.length}):`);
  for (const p of problems) console.error(' -', p);
  process.exit(1);
}
const counts = {};
for (const c of concepts) counts[c.world || 'electrical'] = (counts[c.world || 'electrical'] || 0) + 1;
console.log('TradeSchool validation passed.');
console.log(`Concepts: ${concepts.length}`);
console.log(counts);
