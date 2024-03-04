
/* MAIN */

type Remote = {
  name: string;
  refs: {
    fetch?: string;
    push?: string;
  };
};

/* EXPORT */

export type {Remote};
