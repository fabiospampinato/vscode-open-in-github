
/* IMPORT */

import URL from './url';

/* COMMANDS */

function openProject () {

  return URL.open ();

}

function openIssues () {

  return URL.open ( false, false, 'issues' );

}

function openPullRequests () {

  return URL.open ( false, false, 'pulls' );

}

function openActions () {

  return URL.open ( false, false, 'actions' );

}

function openProjects () {

  return URL.open ( false, false, 'projects' );

}

function openWiki () {

  return URL.open ( false, false, 'wiki' );

}

function openSettings () {

  return URL.open ( false, false, 'settings' );

}

function openReleases () {

  return URL.open ( false, false, 'releases' );

}

function openFile () {

  return URL.open ( true, false, 'blob' );

}

function openFileHistory () {

  return URL.open ( true, false, 'commits' );

}

function openFileBlame () {

  return URL.open ( true, false, 'blame' );

}

function openFilePermalink () {

  return URL.open ( true, true, 'blob' );

}

function copyFilePermalink () {

  return URL.copy ( true, true, 'blob' );

}

/* EXPORT */

export {openProject, openIssues, openPullRequests, openActions, openProjects, openWiki, openSettings, openReleases, openFile, openFileHistory, openFileBlame, openFilePermalink, copyFilePermalink};
