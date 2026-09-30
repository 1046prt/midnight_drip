import fs from 'node:fs'
import path from 'node:path'

const src = path.resolve('src')
const files = []
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(vue|js)$/.test(e.name)) files.push(p)
  }
}
walk(src)

let errors = 0
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  // Match static imports and dynamic import() calls
  const re = /(?:import\s[^'"]*?from\s*|import\s*\(\s*)['"]([^'"]+)['"]/g
  let m
  while ((m = re.exec(content))) {
    const spec = m[1]
    if (!spec.startsWith('@/') && !spec.startsWith('./') && !spec.startsWith('../')) continue
    let resolved
    if (spec.startsWith('@/')) resolved = path.join(src, spec.slice(2))
    else resolved = path.resolve(path.dirname(file), spec)
    const candidates = [resolved, resolved + '.vue', resolved + '.js', resolved + '.json', path.join(resolved, 'index.js')]
    if (!candidates.some(c => fs.existsSync(c))) {
      console.log(`BROKEN  ${path.relative('.', file)}  ->  ${spec}`)
      errors++
    }
  }
}
console.log(errors === 0 ? `\nOK: all imports resolve (${files.length} files checked)` : `\nFAIL: ${errors} broken imports`)
process.exit(errors === 0 ? 0 : 1)
