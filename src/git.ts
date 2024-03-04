
/* IMPORT */

import {execFileSync} from 'node:child_process';
import {getConfig} from 'vscode-extras';
import type {ExecFileOptionsWithBufferEncoding} from 'node:child_process';
import type {Remote} from './types';

/* MAIN */

const Git = {

  /* API */

  exec: ( args: string[], options: Partial<ExecFileOptionsWithBufferEncoding> ): string => {

    return execFileSync ( 'git', args, { stdio: 'pipe', ...options } ).toString ().trim ();

  },

  getBranch: async ( cwd: string ): Promise<string> => {

    const config = getConfig ( 'openInGitHub' );

    if ( !config?.useLocalBranch ) return config?.remote?.branch || 'master';

    return Git.exec ( ['branch', '--show-current'], { cwd } );

  },

  getCommit: async ( cwd: string ): Promise<string> => {

    return Git.exec ( ['rev-parse', 'HEAD'], { cwd } );

  },

  getRemotes: async ( cwd: string ): Promise<Remote[]> => {

    const remoteRe = /^(\S+)\s+(\S+)(?:\s+\((push|fetch)\))?$/;
    const remotesLines = Git.exec ( ['remote', '-v'], { cwd } ).split ( /\r?\n|\r/g );
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

    const config = getConfig ( 'openInGitHub' );
    const domain = config?.github?.domain || 'github.com';
    const origin = config?.remote?.name || 'origin';

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

    return `https://${domain}/${match[1]}/${match[2]}`;

  }

};

/* EXPORT */

export default Git;
