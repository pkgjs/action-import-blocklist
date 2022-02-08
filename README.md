# Import Blocklist

This is an action for projects that span organizations to import a blocklist from one organzation to another.

## Why

Some teams have multiple organizations. GitHub does not currently provide a way to share blocklists across organizations. Once you hit a certain scale, manually sharing blocklists across organizations becomes burdensome. This action allows you to move that burden from people and put it on machines.

## Usage

For this action to work, you'll need to do the following:

* Create a new workflow inside of a repo. This means a new file in `.github/workflows`. I recommend naming it `blocklist.yml`.
* Configure the action to use this repository. There is a template you can use below.
  * You will need to define `sourceOrganization` as the organization you want to use as the source of your blocklist. You will also need to define `targetOrganization` as the organization you want to import the blocklist into.
    * For example, if I want to pull all blocked users from the [Node.js GitHub organization](https://github.com/nodejs) into the [pkgjs GitHug organization](https://github.com/pkgjs), my `sourceOrganization` would be `nodejs` and `targetOrganization` would be `pkgjs`.
* In your repository's Secrets tab, you're going to need to create a secret that will contain a Personal Access Token.
  * This token **MUST** have the `admin:org` scope, as is required by [GitHub's API](https://docs.github.com/en/rest/reference/orgs#blocking-users) (you will recieve HTTP 404 errors if you do not give it that scope).
  * The name of the secret **does not matter** as long as you use that name in your workflow. The template below uses `IMPORT_GITHUB_BLOCKLIST_TOKEN` as the name.

### Template
```yaml
name: Import Blocklist
on:
    workflow_dispatch:

jobs:
  import_blocklist:
    runs-on: ubuntu-latest
    steps:
      - uses: cutenode/action-import-blocklist@HEAD
        with:
          sourceOrganization: my-source-org
          targetOrganization: my-target-org
          token: ${{ secrets.IMPORT_GITHUB_BLOCKLIST_TOKEN }}
```

## F.A.Q.

* **Is this bidirectional?**
  * No. This is a one-way import. That said, just put it in both orgs and you effectively get bidirectionality. If you have more than two orgs, I recommend having a root org and setting up imports/exports from/to that org.
* **Is this reversable?**
  * Yes, but you'll have to reverse it manually. This action **does not** have an automatic feature.
* **Where do I need to run this Action from?**
  * This action can be run from anywhere, presuming you provide a PAT from a user with access to both organizations. 