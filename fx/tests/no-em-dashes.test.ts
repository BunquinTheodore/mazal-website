import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = join(__dirname, '..');
const DASH = new RegExp('[\\u2014\\u2013]');

const TARGETS: ReadonlyArray<{ dir: string; ext: string }> = [
  { dir: 'lib', ext: '.ts' },
  { dir: 'components', ext: '.tsx' },
  { dir: 'app', ext: '.tsx' },
  { dir: 'app', ext: '.ts' },
];

function walk(dir: string, ext: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full, ext);
    return full.endsWith(ext) ? [full] : [];
  });
}

function findDashes(file: string): string[] {
  return readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .flatMap((line, i) =>
      DASH.test(line) ? [`${relative(ROOT, file)}:${i + 1}: ${line.trim()}`] : [],
    );
}

describe('no em or en dashes in source', () => {
  it('finds none in lib, components, or app', () => {
    const hits = TARGETS.flatMap(({ dir, ext }) => walk(join(ROOT, dir), ext)).flatMap(
      findDashes,
    );
    expect(hits, `Dash punctuation found:\n${hits.join('\n')}`).toEqual([]);
  });
});
