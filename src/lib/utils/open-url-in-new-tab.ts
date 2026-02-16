export const openUrlInNewTab = ({ url }: { url: string }) => {
  window.open(url, '_blank');
};
