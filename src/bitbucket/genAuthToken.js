export default function genAuthToken(appPassword, userName) {
  const token = Buffer.from(`${userName}:${appPassword}`).toString("base64");
  return token;
}
