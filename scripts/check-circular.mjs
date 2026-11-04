import madge from 'madge'

const graph = await madge('src/', {
  fileExtensions: ['ts', 'tsx'],
  tsConfig: 'tsconfig.json',
  // CSS package imports are not JavaScript dependency edges.
  dependencyFilter: (path) => !path.endsWith('.css'),
})
const cycles = graph.circular()
const skipped = graph.warnings().skipped ?? []

if (cycles.length || skipped.length) {
  console.error('Circular or unresolved source imports:', { cycles, skipped })
  process.exitCode = 1
} else {
  console.log('No circular or unresolved source imports.')
}
