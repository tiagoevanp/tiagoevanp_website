import { readFileSync, rmSync } from 'node:fs';
import path from 'node:path';

// Runs after `next build`. The static export still writes a file for every route, so while the skill docs are
// hidden (src/lib/features.ts) their files are removed from out/. GitHub Pages then answers those URLs with
// 404.html and a 404 status, and none of the docs' content ships
const root = path.resolve(import.meta.dirname, '..');
const features = readFileSync(path.join(root, 'src/lib/features.ts'), 'utf8');
const skillDocsEnabled = /SKILL_DOCS_ENABLED\s*=\s*true/.test(features);

if (!skillDocsEnabled) {
    for (const file of ['skill-docs', 'skill-docs.html', 'skill-docs.txt']) {
        rmSync(path.join(root, 'out', file), { recursive: true, force: true });
    }

    console.log('Skill docs are hidden: removed out/skill-docs from the export');
}
