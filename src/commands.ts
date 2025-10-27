
/* IMPORT */

import URL from './url';

/* MAIN */

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

const openCommits = (): Promise<void> => {

  return URL.open ( false, false, 'commits' );

};

const openDiscussions = (): Promise<void> => {

  return URL.open ( false, false, 'discussions' );

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

const copyFileLink = (): Promise<void> => {

  return URL.copy ( true, false, 'blob' );

};

const copyFilePermalink = (): Promise<void> => {

  return URL.copy ( true, true, 'blob' );

};

/* EXPORT */

export {openProject, openIssues, openPullRequests, openActions, openCommits, openDiscussions, openProjects, openSecurity, openInsights, openWiki, openSettings, openReleases, openTags, openFile, openFileHistory, openFileBlame, openFilePermalink, copyFileLink, copyFilePermalink};
