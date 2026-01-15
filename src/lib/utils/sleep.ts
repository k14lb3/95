export const sleep = ({ ms }: { ms: number }) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};
