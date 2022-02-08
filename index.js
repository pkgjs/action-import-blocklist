const core = require('@actions/core')
const github = require('@actions/github')

async function action() {
  const org = core.getInput('organization', { required: true })
  const privilegedToken = core.getInput('token', { required: true })
  const octokit = new github.getOctokit(privilegedToken)

  const blockedUsers = await octokit.rest.orgs.listBlockedUsers({ org })
  console.log(`Blocked users: ${blockedUsers}`)
}

action()