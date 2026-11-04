import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const types = 'feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert'
const mode = process.argv[2]

if (mode === 'commit') {
  const message = readFileSync(process.argv[3], 'utf8').split('\n')[0]
  if (!new RegExp(`^(${types})(\\([a-z0-9][a-z0-9._/-]*\\))?!?: .+`).test(message)) {
    console.error('Use a Conventional Commit, e.g. feat(ui): add project navigation')
    process.exitCode = 1
  }
} else if (mode === 'branch') {
  const branch =
    process.env.BRANCH_NAME ||
    execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim()
  const pattern = new RegExp(`^(${types})/[a-z0-9]+(?:-[a-z0-9]+)*$`)
  if (branch !== 'main' && !branch.startsWith('dependabot/') && !pattern.test(branch)) {
    console.error(
      `Invalid branch "${branch}". Use feat/short-kebab-description (or fix/, docs/, chore/, etc.).`,
    )
    process.exitCode = 1
  }
} else if (mode === 'pr-title') {
  const title = process.env.PR_TITLE || ''
  if (!new RegExp(`^(${types})(\\([a-z0-9][a-z0-9._/-]*\\))?!?: .+`).test(title)) {
    console.error('The PR title must be a Conventional Commit so squash merges keep clean history.')
    process.exitCode = 1
  }
} else {
  throw new Error('Expected commit <message-file>, branch, or pr-title')
}
