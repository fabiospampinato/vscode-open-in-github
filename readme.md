# Open in GitHub

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-open-in-github/master/resources/logo.png" width="128" alt="Logo">
</p>

Open the current project or file in github.com.

There are many other extensions for doing this, but they either didn't work well for me or they provided too few/many functionalities.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-open-in-github), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-open-in-github
```

## Usage

It adds 20 commands to the command palette:

```js
'Open in GitHub: Project' // Open the current project in GitHub
'Open in GitHub: Repository' // Open the current repository in GitHub
'Open in GitHub: File' // Open the current file in GitHub
'Open in GitHub: File Blame' // Open the current file's blame in GitHub
'Open in GitHub: File History' // Open the current file's history in GitHub
'Open in GitHub: File Permalink' // Open the current file's permalink in GitHub
'Open in GitHub: Issues' // Open the current project's issues in GitHub
'Open in GitHub: Pull Requests' // Open the current project's pull requests in GitHub
'Open in GitHub: Releases' // Open the current project's releases in GitHub
'Open in GitHub: Tags' // Open the current project's tags in GitHub
'Open in GitHub: Actions' // Open the current project's actions in GitHub
'Open in GitHub: Commits' // Open the current project's commits in GitHub
'Open in GitHub: Discussions' // Open the current project's discussions in GitHub
'Open in GitHub: Projects' // Open the current project's projects in GitHub
'Open in GitHub: Security' // Open the current project's security in GitHub
'Open in GitHub: Insights' // Open the current project's insights in GitHub
'Open in GitHub: Wiki' // Open the current project's wiki in GitHub
'Open in GitHub: Settings' // Open the current project's settings in GitHub
'Open in GitHub: Copy File Link' // Copy the current file's link to GitHub
'Open in GitHub: Copy File Permalink' // Copy the current file's permalink to GitHub
```

## Settings

```js
{
  "openInGitHub.github.protocol": "https", // Custom URL protocol
  "openInGitHub.github.domain": "github.com", // Custom GitHub domain
  "openInGitHub.remote.name": "origin", // Name of the remote repository
  "openInGitHub.remote.branch": "master", // Name of the remote branch
  "openInGitHub.useLocalDomain": true, // Use the local domain instead of the fixed github domain
  "openInGitHub.useLocalBranch": true, // Use the local branch instead of the fixed remote branch
  "openInGitHub.useLocalRange": true, // Highlight the local selection range, if there's one
  "openInGitHub.useLocalLine": false // Highlight the local line if there's no selection range
}
```

## License

MIT © Fabio Spampinato
