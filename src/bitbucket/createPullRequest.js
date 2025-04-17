import axios from "axios";

export default async function createPullRequest({
  workspace,    
  repo,          
  headBranch,
  baseBranch,
  title,
  description,
  token, 
}) {
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo}/pullrequests`;

  const headers = {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };

  const data = {
    title,
    description,
    source: {
      branch: { name: headBranch },
    },
    destination: {
      branch: { name: baseBranch },
    },
    close_source_branch: false,
    draft: false,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao criar o Pull Request: ${error.response?.status} - ${error.response?.statusText}`
    );
    console.error("Detalhes do erro:", error.response?.data);
    return null;
  }
}