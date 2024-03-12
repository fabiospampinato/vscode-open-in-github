
/* IMPORT */

import path from 'node:path';
import vscode from 'vscode';
import {alert, getActiveFilePath, getGitRootPath, openInExternal} from 'vscode-extras';
import {ERROR_NO_REPOSITORY, ERROR_NO_REMOTE, ERROR_NO_FILE} from './constants';
import {getOptions} from './utils';
import Git from './git';

/* MAIN */

const URL = {

  /* API */

  get: async ( file: boolean = false, permalink: boolean = false, page?: string ): Promise<string | 1 | 2 | 3> => {

    const rootPath = await getGitRootPath ();

    if ( !rootPath ) return ERROR_NO_REPOSITORY;

    const repoUrl = await Git.getRemoteUrl ( rootPath );

    if ( !repoUrl ) return ERROR_NO_REMOTE;

    let branch = '';
    let commit = '';
    let filePath = '';
    let lines = '';

    if ( file ) {

      const editorPath = getActiveFilePath ();

      if ( !editorPath ) return ERROR_NO_FILE;

      filePath = path.relative ( rootPath, editorPath ).replace( /\\+/g, '/' );

      if ( filePath ) {

        branch = await Git.getBranch ( rootPath );

        const options = getOptions ();

        if ( options.useLocalRange ) {

          const selections = vscode.window.activeTextEditor?.selections;

          if ( selections?.length === 1 ) {

            const selection = selections[0];

            if ( !selection.isEmpty ) {

              if ( selection.start.line === selection.end.line ) {

                lines = `#L${selection.start.line + 1}`;

              } else {

                lines = `#L${selection.start.line + 1}-L${selection.end.line + 1}`;

              }

            } else if ( options.useLocalLine ) {

              lines = `#L${selection.start.line + 1}`;

            }

          }

        }

        if ( permalink ) {

          branch = '';
          commit = await Git.getCommit ( rootPath );

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

    if ( url === ERROR_NO_REPOSITORY ) return alert.error ( 'You have to open a git project before being able to open it in GitHub' );
    if ( url === ERROR_NO_REMOTE ) return alert.error ( 'Remote repository not found' );
    if ( url === ERROR_NO_FILE ) return alert.error ( 'You have to open a repository file before being able to open it in GitHub' );

    vscode.env.clipboard.writeText ( url );

    alert.info ( 'Link copied to clipboard!' );

  },

  open: async ( file: boolean = false, permalink: boolean = false, page?: string ): Promise<void> => {

    const url = await URL.get ( file, permalink, page );

    if ( url === ERROR_NO_REPOSITORY ) return alert.error ( 'You have to open a git project before being able to open it in GitHub' );
    if ( url === ERROR_NO_REMOTE ) return alert.error ( 'Remote repository not found' );
    if ( url === ERROR_NO_FILE ) return alert.error ( 'You have to open a repository file before being able to open it in GitHub' );

    openInExternal ( url );

  }

};

/* EXPORT */

export default URL;
