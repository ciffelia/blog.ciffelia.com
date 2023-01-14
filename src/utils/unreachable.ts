const unreachable = (value?: never): never => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Reached unreachable code: ${value}`);
};

export { unreachable };
