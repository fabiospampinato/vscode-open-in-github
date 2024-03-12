
/* IMPORT */

import {exec} from 'vscode-extras';
import {getOptions} from './utils';
import type {Remote} from './types';

/* MAIN */

const Git = {

  /* API */

  exec: async ( cwd: string, args: string[] ): Promise<string> => {

    const {stdout} = await exec ( 'git', args, { cwd, stdio: 'pipe' } );
    const output = stdout.toString ().trim ();

    return output;

  },

  getBranch: async ( cwd: string ): Promise<string> => {

    const options = getOptions ();

    if ( !options.useLocalBranch ) return options.remote.branch;

    return Git.exec ( cwd, ['branch', '--show-current'] );

  },

  getCommit: async ( cwd: string ): Promise<string> => {

    return Git.exec ( cwd, ['rev-parse', 'HEAD'] );

  },

  getRemotes: async ( cwd: string ): Promise<Remote[]> => {

    const remoteRe = /^(\S+)\s+(\S+)(?:\s+\((push|fetch)\))?$/;
    const remotesLinesRaw = await Git.exec ( cwd, ['remote', '-v'] );
    const remotesLines = remotesLinesRaw.split ( /\r?\n|\r/g );
    const remotesMap: Record<string, Remote> = {};

    for ( const line of remotesLines ) {

      const match = remoteRe.exec ( line );

      if ( !match ) continue;

      const name = match[1];
      const ref = match[2];
      const type = match[3] || 'fetch';

      remotesMap[name] ||= { name, refs: {} };

      if ( type !== 'fetch' && type !== 'push' ) continue;

      remotesMap[name].refs[type] = ref;

    }

    return Object.values ( remotesMap );

  },

  getRemoteUrl: async ( cwd: string ): Promise<string | undefined> => {

    const options = getOptions ();
    const protocol = options.github.protocol;
    const domain = options.github.domain;
    const origin = options.remote.name;

    const remotes = await Git.getRemotes ( cwd );
    const remotesGithub = remotes.filter ( remote => remote.refs.fetch?.includes ( domain ) || remote.refs.push?.includes ( domain ) );
    const remoteOrigin = remotesGithub.filter ( remote => remote.name === origin )[0];
    const remote = remoteOrigin || remotesGithub[0];

    if ( !remote ) return;

    const ref = remote.refs.fetch || remote.refs.push

    if ( !ref ) return;

    const re = /\.[^.:/]+[:/]([^/]+)\/(.*?)(?:\.git|\/)?$/;
    const match = re.exec ( ref );

    if ( !match ) return;

    return `${protocol}://${domain}/${match[1]}/${match[2]}`;

  }

};

/* EXPORT */

export default Git;
