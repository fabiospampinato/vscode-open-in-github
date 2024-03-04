
/* IMPORT */

import URL from './url';

/* MAIN */

//TODO: Add a "copyFile" command too

const openProject = (): Promise<void> => {

  return URL.open ();

};

const openIssues = (): Promise<void> => {

  return URL.open ( false, false, 'issues' );

};

const openPullRequests = (): Promise<void> => {

  return URL.open ( false, false, 'pulls' );

};

const openActions = (): Promise<void> => {

  return URL.open ( false, false, 'actions' );

};

const openProjects = (): Promise<void> => {

  return URL.open ( false, false, 'projects' );

};

const openSecurity = (): Promise<void> => {

  return URL.open ( false, false, 'security' );

};

const openInsights = (): Promise<void> => {

  return URL.open ( false, false, 'pulse' );

};

const openWiki = (): Promise<void> => {

  return URL.open ( false, false, 'wiki' );

};

const openSettings = (): Promise<void> => {

  return URL.open ( false, false, 'settings' );

};

const openReleases = (): Promise<void> => {

  return URL.open ( false, false, 'releases' );

};

const openTags = (): Promise<void> => {

  return URL.open ( false, false, 'tags' );

};

const openFile = (): Promise<void> => {

  return URL.open ( true, false, 'blob' );

};

const openFileHistory = (): Promise<void> => {

  return URL.open ( true, false, 'commits' );

};

const openFileBlame = (): Promise<void> => {

  return URL.open ( true, false, 'blame' );

};

const openFilePermalink = (): Promise<void> => {

  return URL.open ( true, true, 'blob' );

};

const copyFilePermalink = (): Promise<void> => {

  return URL.copy ( true, true, 'blob' );

};

/* EXPORT */

export {openProject, openIssues, openPullRequests, openActions, openProjects, openSecurity, openInsights, openWiki, openSettings, openReleases, openTags, openFile, openFileHistory, openFileBlame, openFilePermalink, copyFilePermalink};
