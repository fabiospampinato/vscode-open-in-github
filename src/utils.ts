
/* IMPORT */

import {getConfig} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const getOptions = (): Options => {

  const config = getConfig ( 'openInGitHub' );
  const protocol = isString ( config?.github?.protocol ) ? config.github.protocol : 'https';
  const domain = isString ( config?.github?.domain ) ? config.github.domain : 'github.com';
  const name = isString ( config?.remote?.name ) ? config.remote.name : 'origin';
  const branch = isString ( config?.remote?.branch ) ? config.remote.branch : 'master';
  const useLocalDomain = isBoolean ( config?.useLocalDomain ) ? config.useLocalDomain : true;
  const useLocalBranch = isBoolean ( config?.useLocalBranch ) ? config.useLocalBranch : true;
  const useLocalRange = isBoolean ( config?.useLocalRange ) ? config.useLocalRange : true;
  const useLocalLine = isBoolean ( config?.useLocalLine ) ? config.useLocalLine : false;

  return { github: { protocol, domain }, remote: { name, branch }, useLocalDomain, useLocalBranch, useLocalRange, useLocalLine };

};

const isBoolean = ( value: unknown ): value is boolean => {

  return typeof value === 'boolean';

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {getOptions, isBoolean, isString};
