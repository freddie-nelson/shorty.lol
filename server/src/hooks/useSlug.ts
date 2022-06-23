const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

export const useSlug = (length = 4) => {
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }

  return slug;
};
