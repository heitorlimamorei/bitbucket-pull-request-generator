export function loadEnv() {
  const args = process.argv.slice(2);
  let originalDir;
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--original-dir=")) {
      originalDir = args[i].split("=")[1];
      break;
    }
  }

  const apiKey = process.env.OPEN_AI_KEY;
  const bitbucketAppPassword = process.env.BITBUCKET_APP_PASSWORD;
  const bitbucketUserName = process.env.BITBUCKET_USER_NAME;


  return { apiKey, bitbucketAppPassword, bitbucketUserName, originalDir };
}

export function ensureTokens(apiKey, bitbucketAppPassword, bitbucketUserName) {
  if (!apiKey || !bitbucketAppPassword || !bitbucketUserName) {
    console.error(
      "As chaves de API (OPEN_AI_KEY), Bitbucket app password (BITBUCKET_APP_PASSWORD) e Bitbucker user name (BITBUCKET_USER_NAME) são necessárias.",
    );
    process.exit(1);
  }
}
