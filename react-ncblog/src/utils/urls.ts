export const isExternalURL = (url: string) => {
  return /^(https?:\/\/|mailto:|tel:)/.test(url);
};
