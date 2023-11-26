export function generateRandomUsername() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let username = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  return username;
}

export function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${randomString}@example.com`;
}
