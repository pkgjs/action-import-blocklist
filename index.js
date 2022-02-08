const core = require('@actions/core')
const github = require('@actions/github')

const importOrg = core.getInput('organization', { required: true })

async function action() {
  const privlidgedToken = core.getInput('token', { required: true })

  const octokit = new github.getOctokit(privlidgedToken)

  const blockedUsers = await octokit.rest.orgs.listBlockedUsers({ importOrg })
}