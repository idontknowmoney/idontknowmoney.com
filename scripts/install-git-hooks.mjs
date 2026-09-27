// Installs lefthook's git hooks on `pnpm install`. Skipped when there is no
// git checkout (e.g. Vercel builds), where `lefthook install` would fail.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (existsSync('.git')) {
	execSync('lefthook install', { stdio: 'inherit' });
}
