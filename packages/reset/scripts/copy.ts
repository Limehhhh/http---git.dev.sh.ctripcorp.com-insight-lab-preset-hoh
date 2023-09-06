import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

await fs.copyFile(
  require.resolve('@csstools/normalize.css'),
  'normalize.css',
)

if (!existsSync('sanitize'))
  await fs.mkdir('sanitize')

for (const stylesheet of [
  'sanitize.css',
  'forms.css',
  'assets.css',
  'typography.css',
  'reduce-motion.css',
  'system-ui.css',
  'ui-monospace.css',
]) {
  await fs.copyFile(
    `${dirname(require.resolve('sanitize.css'))}/${stylesheet}`,
    `sanitize/${stylesheet}`,
  )
}
