export function parseBitbucketUrl(url) {
  const cleanedUrl = url.replace(/\.git$/, "");

  let ownerRepoPart = "";
  if (cleanedUrl.includes("bitbucket.org/")) {
    ownerRepoPart = cleanedUrl.split("bitbucket.org/")[1];
  } else if (cleanedUrl.includes("bitbucket.org:")) {
    ownerRepoPart = cleanedUrl.split("bitbucket.org:")[1];
  }

  if (!ownerRepoPart) {
    return { owner: "", repo: "" };
  }

  const [owner, repo] = ownerRepoPart.split("/");
  return { owner, repo };
}
