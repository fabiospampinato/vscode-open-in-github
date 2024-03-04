
/* IMPORT */

import vscode from 'vscode';
import {getConfig, getProjectRootPath} from 'vscode-extras';
import {NO_REPOSITORY, NO_REMOTE, NO_FILE} from './constants';
import Git from './git';

/* MAIN */

const URL = {

  /* API */

  get: async ( file: boolean = false, permalink: boolean = false, page?: string ): Promise<string | 1 | 2 | 3> => {

    const repoPath = await getProjectRootPath ();

    if ( !repoPath ) return NO_REPOSITORY;

    const repoUrl = await Git.getRemoteUrl ( repoPath );

    if ( !repoUrl ) return NO_REMOTE;

    let branch = '';
    let commit = '';
    let filePath = '';
    let lines = '';

    if ( file ) {

      const {activeTextEditor} = vscode.window;

      if ( !activeTextEditor ) return NO_FILE;

      const editorPath = activeTextEditor.document.uri.fsPath;

      filePath = editorPath.substring ( repoPath.length + 1 ).replace( /\\/g, '/' ) || '';

      if ( filePath ) {

        branch = await Git.getBranch ( repoPath );

        const config = getConfig ( 'openInGitHub' );

        if ( config?.useLocalRange ) {

          const selections = activeTextEditor.selections;

          if ( selections.length === 1 ) {

            const selection = selections[0];

            if ( !selection.isEmpty ) {

              if ( selection.start.line === selection.end.line ) {

                lines = `#L${selection.start.line + 1}`;

              } else {

                lines = `#L${selection.start.line + 1}-L${selection.end.line + 1}`;

              }

            } else if ( config?.useLocalLine ) {

              lines = `#L${selection.start.line + 1}`;

            }

          }

        }

        if ( permalink ) {

          branch = '';
          commit = await Git.getCommit ( repoPath );

        }

      }

    }

    branch = encodeURIComponent ( branch );
    filePath = encodeURIComponent ( filePath ).replace ( /%2F/g, '/' );

    const url = [repoUrl, page, branch, commit, filePath, lines].filter ( Boolean ).join ( '/' );

    return url;

  },

  copy: async ( file: boolean = false, permalink: boolean = false, page?: string ): Promise<void> => {

    const url = await URL.get ( file, permalink, page );

    if ( url === NO_REPOSITORY ) return void vscode.window.showErrorMessage ( 'You have to open a git project before being able to open it in GitHub' );
    if ( url === NO_REMOTE ) return void vscode.window.showErrorMessage ( 'Remote repository not found' );
    if ( url === NO_FILE ) return void vscode.window.showErrorMessage ( 'You have to open a repository file before being able to open it in GitHub' );

    vscode.env.clipboard.writeText ( url );
    vscode.window.showInformationMessage ( 'Link copied to clipboard!' );

  },

  open: async ( file: boolean = false, permalink: boolean = false, page?: string ): Promise<void> => {

    const url = await URL.get ( file, permalink, page );

    if ( url === NO_REPOSITORY ) return void vscode.window.showErrorMessage ( 'You have to open a git project before being able to open it in GitHub' );
    if ( url === NO_REMOTE ) return void vscode.window.showErrorMessage ( 'Remote repository not found' );
    if ( url === NO_FILE ) return void vscode.window.showErrorMessage ( 'You have to open a repository file before being able to open it in GitHub' );

    vscode.env.openExternal ( vscode.Uri.parse ( url ) );

  }

};

/* EXPORT */

export default URL;
