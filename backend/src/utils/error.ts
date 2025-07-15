export const generateError = (err: string = 'Something went wrong'): never => {
  throw new Error(err);
};