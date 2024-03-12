
/* MAIN */

type Options = {
  github: {
    protocol: string,
    domain: string
  },
  remote: {
    name: string,
    branch: string
  },
  useLocalDomain: boolean,
  useLocalBranch: boolean,
  useLocalRange: boolean,
  useLocalLine: boolean
};

type Remote = {
  name: string;
  refs: {
    fetch?: string;
    push?: string;
  };
};

/* EXPORT */

export type {Options, Remote};
