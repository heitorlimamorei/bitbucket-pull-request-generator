export function getPrompts({ detectedWorkspace, detectedRepo, currentBranch }) {
  return [
    {
      name: "workspace",
      message: "Digite o nome do workspace (ws):",
      default: detectedWorkspace,
    },
    {
      name: "repo",
      message: "Digite o nome do repositório (repo):",
      default: detectedRepo,
    },
    {
      name: "headBranch",
      message: "Digite o nome da branch de origem (headBranch):",
      default: currentBranch,
    },
    {
      name: "baseBranch",
      message: "Digite o nome da branch base (baseBranch):",
    },
    {
      name: "title",
      message: "Digite o título do Pull Request:",
      default: (answers) => answers.headBranch,
    },
    {
      name: "model",
      message: "Digite o nome do modelo GPT a ser usado (model):",
      default: "gpt-4o-mini-2024-07-18",
    },
  ];
}
