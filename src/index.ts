
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';

/* MAIN */

const activate = (): void => {

  vscode.commands.registerCommand ( 'openInGitHub.openProject', Commands.openProject );
  vscode.commands.registerCommand ( 'openInGitHub.openFile', Commands.openFile );
  vscode.commands.registerCommand ( 'openInGitHub.openFileHistory', Commands.openFileHistory );
  vscode.commands.registerCommand ( 'openInGitHub.openFileBlame', Commands.openFileBlame );
  vscode.commands.registerCommand ( 'openInGitHub.openFilePermalink', Commands.openFilePermalink );
  vscode.commands.registerCommand ( 'openInGitHub.openIssues', Commands.openIssues );
  vscode.commands.registerCommand ( 'openInGitHub.openPullRequests', Commands.openPullRequests );
  vscode.commands.registerCommand ( 'openInGitHub.openReleases', Commands.openReleases );
  vscode.commands.registerCommand ( 'openInGitHub.openTags', Commands.openTags );
  vscode.commands.registerCommand ( 'openInGitHub.openActions', Commands.openActions );
  vscode.commands.registerCommand ( 'openInGitHub.openProjects', Commands.openProjects );
  vscode.commands.registerCommand ( 'openInGitHub.openSecurity', Commands.openSecurity );
  vscode.commands.registerCommand ( 'openInGitHub.openInsights', Commands.openInsights );
  vscode.commands.registerCommand ( 'openInGitHub.openWiki', Commands.openWiki );
  vscode.commands.registerCommand ( 'openInGitHub.openSettings', Commands.openSettings );
  vscode.commands.registerCommand ( 'openInGitHub.copyFileLink', Commands.copyFileLink );
  vscode.commands.registerCommand ( 'openInGitHub.copyFilePermalink', Commands.copyFilePermalink );

};

/* EXPORT */

export {activate};
