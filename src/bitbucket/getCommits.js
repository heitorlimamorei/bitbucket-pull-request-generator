import axios from "axios";

export default async function getCommitsFromBitbucket({
  workspace,
  repo,
  baseBranch,
  headBranch,
  token
}) {
  const baseUrl = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo}`;

  const bitbucketHeaders = {
    Authorization: `Basic ${token}`,
    "User-Agent": "pr-desc-generator/1.1",
  };

  try {
    const commitsResp = await axios.get(
      `${baseUrl}/commits/?include=${encodeURIComponent(
        headBranch
      )}&exclude=${encodeURIComponent(baseBranch)}`,
      {
        headers: bitbucketHeaders,
      }
    );

    const commits = commitsResp.data.values;

    let results = [];

    for (const commit of commits) {
      const commitResp = await axios.get(`${baseUrl}/diff/${commit.hash}`, {
        headers: bitbucketHeaders,
      });

      results.push({
        sha: commit.hash,
        message: commit.message,
        files: commitResp.data,
        date: commit.date,
      });
    }

    return results;
  } catch (err) {
    console.error("❌ Failed to fetch commits with changes:", error.message);
    return [];
  }
}
