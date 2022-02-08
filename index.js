const core = require('@actions/core')
const github = require('@actions/github')

async function action() {
  const source = core.getInput('sourceOrganization', { required: true })
  const target = core.getInput('targetOrganization', { required: true })
  const privilegedToken = core.getInput('token', { required: true })
  const octokit = new github.getOctokit(privilegedToken)

  const apiResponse = await octokit.paginate(octokit.rest.orgs.listBlockedUsers, { org: source })
  const blockedUsers = apiResponse.map(user => user.login)
  blockedUsers.forEach(async function (user) {
    const userIsAlreadyBlocked = await octokit.rest.orgs.checkBlockedUser({ org: target, username: user })
    console.log(JSON.stringify(userIsAlreadyBlocked, null, 2))
    console.log(`Attempting to block user: ${user}`)
    const block = await octokit.rest.orgs.blockUser({
      org: target,
      username: user,
    })
    console.log(`Block response: ${JSON.stringify(block, null, 2)}`)
  })
}

action()