import { execSync } from "child_process";
import { parseBitbucketUrl } from "./parseBitbucketUrl.js";

export function detectBranch(originalDir) {
  if (!originalDir) {
    console.error(
      "Original directory not provided. Can't detect the original branch.",
    );
    process.exit(1);
  }

  return execSync("git rev-parse --abbrev-ref HEAD", {
    encoding: "utf8",
    cwd: originalDir,
  }).trim();
}

export function detectWorkspaceAndRepo(originalDir) {
  let detectedWorkspace = "";
  let detectedRepo = "";

  try {
    const remoteUrl = execSync("git remote get-url origin", {
      encoding: "utf8",
      cwd: originalDir,
    }).trim();
    const parsed = parseBitbucketUrl(remoteUrl);
    detectedWorkspace = parsed.workspace;
    detectedRepo = parsed.repo;
  } catch (err) {
    console.error(
      "Falha ao detectar o repositório. Você poderá informá-lo manualmente.",
    );
  }

  return { detectedWorkspace, detectedRepo };
}
