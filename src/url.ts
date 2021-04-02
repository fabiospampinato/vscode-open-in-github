
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* URL */

const URL = {

  async get ( file = false, permalink = false, page? ) {

    const repopath = await Utils.repo.getPath ();

    if ( !repopath ) return vscode.window.showErrorMessage ( 'You have to open a git project before being able to open it in GitHub' );

    const git = Utils.repo.getGit ( repopath ),
          repourl = await Utils.repo.getUrl ( git );

    if ( !repourl ) return vscode.window.showErrorMessage ( 'Remote repository not found' );

    const config = Config.get ();

    let filePath = '',
        branch = '',
        lines = '',
        hash = '';

    if ( file ) {

      const {activeTextEditor} = vscode.window;

      if ( !activeTextEditor ) return vscode.window.showErrorMessage ( 'You have to open a file before being able to open it in GitHub' );

      const editorPath = activeTextEditor.document.uri.fsPath;

      filePath = editorPath ? editorPath.substring ( repopath.length + 1 ).replace( /\\/g, '/' ) : undefined;

      if ( filePath ) {

        branch = await Utils.repo.getBranch ( git );

        if ( config.useLocalRange ) {

          const selections = activeTextEditor.selections;

          if ( selections.length === 1 ) {

            const selection = selections[0];

            if ( !selection.isEmpty ) {

              if ( selection.start.line === selection.end.line ) {

                lines = `#L${selection.start.line + 1}`;

              } else {

                lines = `#L${selection.start.line + 1}-L${selection.end.line + 1}`;

              }

            } else if ( config.useLocalLine ) {

              lines = `#L${selection.start.line + 1}`;

            }

          }

        }

        if ( permalink ) {

          branch = '';
          hash = await Utils.repo.getHash ( git );

        }

      }

    }

    branch = encodeURIComponent ( branch );
    filePath = encodeURIComponent ( filePath ).replace ( /%2F/g, '/' );

    const url = _.compact ([ repourl, page, branch, hash, filePath, lines ]).join ( '/' );

    return url;

  },

  async copy ( file = false, permalink = false, page? ) {

    const url = await URL.get ( file, permalink, page );

    await vscode.env.clipboard.writeText ( url );

    vscode.window.showInformationMessage ( 'Permalink copied to clipboard!' );

  },

  async open ( file = false, permalink = false, page? ) {

    const url = await URL.get ( file, permalink, page );

    vscode.env.openExternal ( vscode.Uri.parse ( url ) );

  }

};

/* EXPORT */

export default URL;
