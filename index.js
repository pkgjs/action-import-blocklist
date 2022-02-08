const core = require('@actions/core')
const github = require('@actions/github')

async function action() {
  const importOrg = core.getInput('organization', { required: true })
  const privlidgedToken = core.getInput('token', { required: true })
  const octokit = new github.getOctokit(privlidgedToken)

  const blockedUsers = await octokit.rest.orgs.listBlockedUsers({ importOrg })
  console.log(`Blocked users: ${blockedUsers}`)
}

action()