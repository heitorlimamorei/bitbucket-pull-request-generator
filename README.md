# Pull Request Generator AI

Este projeto é uma ferramenta automatizada que baixa os commits de diferença entre uma `base branch` e uma `head branch` no Bitbucket. Ele usa o GPT-4o-mini para criar descrições de pull request baseadas nos textos e diffs desses commits.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Recomendação para Commits Detalhados](#recomendação-para-commits-detalhados)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
  - [Configuração para ZSH](#configuração-para-zsh)
  - [Configuração para Bash](#configuração-para-usuários-do-bash)
- [Uso](#uso)
- [Llama3](#llama3)

## Funcionalidades

- Baixar commits entre duas branches no Bitbucket
- Obter o diff de cada commit individual entre a base e o topo
- Enviar os textos e códigos para a API do GPT-4o-mini (ou outro LLM)
- Criar uma descrição detalhada para um pull request
- Publicar automaticamente o pull request no repositório Bitbucket
- **Análise do código alterado** para enriquecer a descrição
- **Detecção automática do repositório, branch atual e remote**

## Recomendação para Commits Detalhados

Para obter melhores resultados com a IA, mantenha tanto o **título** quanto a **descrição** dos commits detalhados. Isso ajuda a IA a entender o contexto das mudanças e gerar descrições mais úteis e informativas para o pull request.

## Pré-requisitos

- Node.js instalado
- Conta no Bitbucket com App Password habilitado
- Conta na OpenAI com chave de API válida
- (Opcional) Ollama para uso local com Llama3

## Instalação

1. Clone o repositório:

```sh
git clone https://github.com/heitorlimamorei/pull-request-generator
cd pull-request-generator
```

2. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves da API:

```env
BITBUCKET_USERNAME=seu_username
BITBUCKET_APP_PASSWORD=seu_app_password
OPEN_AI_KEY=sua_chave_openai
```

## Configuração

### Configuração para ZSH

#### 1. Adicionar Caminho do Diretório ao ZSH

Abra seu terminal e edite o arquivo `.zshrc`:

```sh
nano ~/.zshrc
```

Adicione:

```sh
export PATH=$PATH:<CAMINHO_DO_DIRETÓRIO>
```

Depois, recarregue:

```sh
source ~/.zshrc
```

#### 2. Criar Alias Global no ZSH

Ainda no `.zshrc`:

```sh
alias generate-pr='(original_dir=$(pwd); cd <CAMINHO_DO_DIRETÓRIO>; npm start -- --original-dir="$original_dir")'
```

Depois:

```sh
source ~/.zshrc
```

### Configuração para Usuários do Bash

1. Edite o `.bashrc`:

```sh
nano ~/.bashrc
```

2. Adicione o caminho:

```sh
export PATH=$PATH:<CAMINHO_DO_DIRETÓRIO>
```

3. Crie o alias:

```sh
alias generate-pr='(original_dir=$(pwd); cd <CAMINHO_DO_DIRETÓRIO>; npm start -- --original-dir="$original_dir")'
```

4. Recarregue:

```sh
source ~/.bashrc
```

## Uso

Com tudo configurado, execute:

```sh
generate-pr
```

O serviço irá:

1. Detectar o repositório Bitbucket e a branch atual
2. Comparar a branch atual com a base (ex: `main`)
3. Coletar todos os commits e diffs intermediários
4. Gerar uma descrição de pull request com IA
5. Criar o PR via API do Bitbucket

## Llama3

Você pode usar o modelo **Llama3** localmente com o Ollama:

### 1. Instalar o Ollama

[Download Ollama](https://ollama.com/download)

### 2. Rodar o modelo:

```sh
ollama run llama3
```

Na hora da geração do PR, você poderá selecionar o **Llama3** como o modelo de IA desejado.
