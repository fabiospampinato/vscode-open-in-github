
/* IMPORT */

import * as _ from 'lodash';
import * as simpleGit from 'simple-git';
import * as openPath from 'open';
import * as pify from 'pify';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* COMMANDS */

function openProject () {

  return open ();

}

function openIssues () {

  return open ( false, 'issues' );

}

function openPullRequests () {

  return open ( false, 'pulls' );

}

function openFile () {

  return open ( true, 'blob' );

}

function openFileHistory () {

  return open ( true, 'commits' );

}

function openFileBlame () {

  return open ( true, 'blame' );

}

async function open ( file = false, page? ) {

  const repopath = await Utils.repo.getPath ();

  if ( !repopath ) return vscode.window.showErrorMessage ( 'You have to open a git project before being able to open it in GitHub' );

  const git = Utils.repo.getGit ( repopath ),
        repourl = await Utils.repo.getUrl ( git );

  if ( !repopath ) return vscode.window.showErrorMessage ( 'Remote repository not found' );

  const config = Config.get ();

  let filePath, branch, lines;

  if ( file ) {

    const {activeTextEditor} = vscode.window;

    if ( !activeTextEditor ) return vscode.window.showErrorMessage ( 'You have to open a file before being able to open it in GitHub' );

    const editorPath = activeTextEditor.document.uri.fsPath;

    filePath = editorPath ? editorPath.substring ( repopath.length + 1 ) : undefined;

    if ( filePath ) {

      branch = await Utils.repo.getBranch ( git );

      if ( config.useLocalRange ) {

        const selections = activeTextEditor.selections;

        if ( selections.length === 1 ) {

          const selection = selections[0];

          if ( !selection.isEmpty ) {

            lines = `#L${selection.start.line + 1}-L${selection.end.line + 1}`;

          }

        }

      }

    }

  }

  const url = _.compact ([ repourl, page, branch, filePath, lines ]).join ( '/' );

  openPath ( url );

}

/* EXPORT */

export {openProject, openIssues, openPullRequests, openFile, openFileHistory, openFileBlame, open};
