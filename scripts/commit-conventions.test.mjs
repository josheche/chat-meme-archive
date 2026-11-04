import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

function check(mode, env) {
  return spawnSync(process.execPath, ['scripts/commit-conventions.mjs', mode], {
    env: { ...process.env, ...env },
    encoding: 'utf8',
  }).status
}

for (const branch of [
  'main',
  'feat/static-gallery',
  'fix/mobile-nav',
  'dependabot/npm_and_yarn/next-16',
]) {
  test(`accepts branch ${branch}`, () => {
    assert.equal(check('branch', { BRANCH_NAME: branch }), 0)
  })
}
for (const branch of ['my changes', 'feat/Uppercase', 'feature', 'fix/trailing-']) {
  test(`rejects branch ${branch}`, () => {
    assert.equal(check('branch', { BRANCH_NAME: branch }), 1)
  })
}
for (const title of [
  'feat(ui): add gallery',
  'fix!: change route contract',
  'chore(release): 0.1.1',
]) {
  test(`accepts PR title ${title}`, () => {
    assert.equal(check('pr-title', { PR_TITLE: title }), 0)
  })
}
test('rejects a non-conventional PR title', () => {
  assert.equal(check('pr-title', { PR_TITLE: 'Update stuff' }), 1)
})
test('validates the first line of an actual commit-message file', () => {
  const directory = mkdtempSync(join(tmpdir(), 'commit-message-'))
  try {
    const path = join(directory, 'COMMIT_EDITMSG')
    writeFileSync(path, 'feat(api)!: revise contract\n\nBREAKING CHANGE: new response format\n')
    const result = spawnSync(process.execPath, ['scripts/commit-conventions.mjs', 'commit', path])
    assert.equal(result.status, 0)
  } finally {
    rmSync(directory, { recursive: true })
  }
})
