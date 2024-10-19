const unreachable = (value?: never): never => {
  throw new Error(`Reached unreachable code: ${value}`);
};

export { unreachable };
