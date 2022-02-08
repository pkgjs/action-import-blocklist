const core = require('@actions/core')
const github = require('@actions/github')

async function action() {
  const org = core.getInput('organization', { required: true })
  const privilegedToken = core.getInput('token', { required: true })
  const octokit = new github.getOctokit(privilegedToken)

  const apiResponse = await octokit.paginate(octokit.rest.orgs.listBlockedUsers, { org })
  console.log(`Blocked users: ${JSON.stringify(apiResponse, null, 2)}`)
}

action()