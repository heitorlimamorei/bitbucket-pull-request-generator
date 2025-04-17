#!/usr/bin/env node

import { configDotenv } from "dotenv";
import inquirer from "inquirer";
import { loadEnv, ensureTokens } from "./config/env.js";
import { getPrompts } from "./config/prompts.js";
import { detectBranch, detectWorkspaceAndRepo } from "./git/detectRepo.js";
import { generatePullRequestDescription } from "./openai/generateDescription.js";
import getCommitsFromBitbucket from "./bitbucket/getCommits.js";
import genAuthToken from "./bitbucket/genAuthToken.js";
import createPullRequest from "./bitbucket/createPullRequest.js";

configDotenv();

const { apiKey, bitbucketAppPassword, originalDir, bitbucketUserName } =
  loadEnv();

ensureTokens(apiKey, bitbucketAppPassword, bitbucketUserName);

async function main() {
  let currentBranch = "";
  try {
    currentBranch = detectBranch(originalDir);
  } catch (err) {
    console.error(
      "Falha ao detectar a branch atual. Você poderá informá-la manualmente."
    );
  }

  const { detectedWorkspace, detectedRepo } =
    detectWorkspaceAndRepo(originalDir);

  const answers = await inquirer.prompt(
    getPrompts({
      detectedWorkspace,
      detectedRepo,
      currentBranch,
    })
  );

  const { workspace, repo, headBranch, baseBranch, model, title } = answers;

  const bitbucketToken = genAuthToken(bitbucketAppPassword, bitbucketUserName);

  const commits = await getCommitsFromBitbucket({
    workspace: workspace,
    repo: repo,
    baseBranch: baseBranch,
    headBranch: headBranch,
    token: bitbucketToken,
  });

  if (!commits || commits.length === 0) {
    console.log("Nenhum commit novo encontrado para gerar a descrição.");
    return;
  }

  const description = await generatePullRequestDescription(
    commits,
    model,
    apiKey
  );

  console.log("Descrição do Pull Request Gerada:\n", description);

  const pr = await createPullRequest({
    workspace,
    repo,
    headBranch,
    baseBranch,
    title,
    description,
    token: bitbucketToken,
  });

  if (pr) {
    console.log(`Pull Request criado com sucesso: ${pr.links.html.href}`);
  }
}

main();
