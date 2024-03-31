# Frete Rapido Integration API

Olá, bom dia, aqui será apresentado uma documentação relativa a estrutura que foi utilizada nessa aplicação, o objetivo dessa documentação é expôr de maneira clara e objetiva o funcionamento da aplicação bem como sua estrutura. Os padrões aqui impostos seguem conceitos como Clean Code, Clean Architecture, SOLID, DRY, KISS e Design Patterns. Essa documentação também tem correlação ao [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) proposto pelo Google. Uma outra fonte de inspiração foi o repositório [Clean Code Typescript](https://github.com/labs42io/clean-code-typescript), que adapta conceitos conhecidos do Clean Code para o Typescript.

# IMPORTANTE

Para rodar esse projeto é necessário rodar primeiramente o script env-config.sh!

```shell
./env-config.sh
```

Caso não consiga rodar ele inicialmente, use o comando chmod para dar permissão de execução para o arquivo!

```shell
chmod +x ./env-config.sh
```

Tendo feito isso adicione no .env gerado as credenciais necessárias para rodar a aplicação!

## Rodando o Projeto

Para rodar o projeto é necessário que possua o [Docker](https://github.com/labs42io/clean-code-typescript) instalado e também o [Compose](https://docs.docker.com/compose/install/linux)!

Para executar a aplicação via docker execute o seguinte comando:

```shell
docker compose up -d
```

Para rodar somente o banco de dados execute:

```shell
docker compose up -d db.mongo.frete-rapido-integration
```

## Acessando a Aplicação

A aplicação é acessível via o endereço http://localhost:3000 e a rota do Swagger é http://localhost:3000/api-docs .

## Estrutura

O Projeto segue o seguinte modelo de orgranização de arquivos e pastas:

```
/...
  /src
  |__/docs
  |__/common
    |__/env
    |__/interfaces
    |__/error-pattern
    |__/logger
    |__/middlewares
    |__/request-factory
  |__/application
    |__/controller
    |__/dto
    |__/routes
  |_/domain
    |_/contract
    |_/entity
    |_/service
  |_/infra
    |_/adapter
    |_/database
    |_/repository
    |_/schema
/...
```

- /src - Aqui se localiza a raíz da aplicação em questão;

- /docs - Aqui é armazendo os arquivos relativos as configurações do Swagger e documentação da aplicação;

- /common - Aqui é armazendo pastas contendo arquivos cuja finalidade é utilizá-los na aplicação como um todo independente do seu local;

  - /env - Local os se localiza o mapeamento das variáveis de ambiente(env) da aplicação
  - /error-pattern - Essa pasta compreende a estrutura de erro padrão da aplicação como um todo
  - /interfaces - Essa pasta compreende as interfaces gerais da aplicação
  - /logger - Essa pasta compreende a estrutura de logs da aplicação
  - /middlewares - Essa pasta compreende a lógica de middlewares aplicados nas rotas da aplicação

- /application:

  - /controller - Essa pasta compreende os controllers da aplicação;
  - /dto - Aqui se localiza as definições de entrada(IN) e saída(OUT) dos controllers;
  - /routes - Aqui se localiza as definições das rotas da aplicação e onde os middlewares são aplicados;

- /domain:

  - /service: Compreende principalmente os services da aplicação;
  - /entity: Entidade de conversão de dados, atuando como um de/para para os dados fornecidos pelo Banco de Dados;
  - /contract: Local onde fica definido os métodos(queries) enviadas ao banco de dados;

- /infra:
  - /database: Aqui se localiza as configurações dos banco de dados;
  - /repository: Aqui se localiza as queries executadas no banco de dados;
  - /adapter: Diretório que compreende conexões com provedores de terceiros ou outras aplicações em diferentes contextos;
  - /schema: Local onde são armazenadas as Tabelas e/ou Schemas/Models relativas aos Banco de Dados;

## Eslint + Prettier + SonarJS

O ESLint/Prettier/SonarJS analisa estaticamente o código da aplicação para encontrar e corrigir problemas de lint rapidamente. Todas as configurações de plugins e regras de lint utilizadas estão no arquivo `.eslintrc.js` na raiz da aplicação.

Para executar o lint basta rodar o seguinte comando: `npm run lint`.

Caso queira entender melhor sobre o funcionamento das bibliotecas, recomendamos a consulta em suas documentações oficiais: [ESLint](https://eslint.org/), [ESLint SonarJS](https://github.com/SonarSource/eslint-plugin-sonarjs/tree/master), [Prettier](https://prettier.io/).

## Padrões de Nomenclatura

- Use PascalCase para nomes de classes e types: `MyClass` e para Interfaces utilizar o prefixo I: `ITestInterface`.
- Use camelCase para nomes de variáveis, funções e métodos: `exampleVariable`, `myFunction()`.
- Use kebab-case + nome da pasta para nome dos arquivos: `my-code.service.ts`,`my-code.repository.ts`.
- Para testes, siga o mesmo padrão de nomes de arquivos, com a adição do sufixo spec: `my-code.service.spec.ts`,`my-code.repository.spec.ts`.
- Use snake_case + uppercase para nomes de constantes e enums: `MAX_LIMIT`, `MIN_LIMIT`.

## Testes

- Neste projeto foi utilizado o [Jest](https://jestjs.io/pt-BR/) como framework para a execução de testes unitários e e2e. Todas as configurações utilizadas podem ser encontradas no arquivo `jest.config.json` presente na raiz do projeto.
- Os arquivos contendo testes unitários devem estar no mesmo diretório do código de produção. Por padrão, os arquivos de teste devem ter o mesmo nome do arquivo onde está a implementação do que está sendo testado, com a adição do sufixo `spec`, por exemplo, `my-code.service.spec.ts`.
- Os testes e2e ficam no diretório `test`, na raiz do projeto, e são organizados por módulos. Esse tipo de teste é utilizado para testar o fluxo da aplicação como um todo, fazendo um request para um endpoint e recebendo uma response. Para efetuar requests nos testes e2e é utilizado a lib [Supertest](https://www.npmjs.com/package/supertest) em conjunto com o Jest. O nome dos arquivos de teste deve ter o seguinte padrão: nome do módulo + sufixo e2e-spec, como por exemplo, `my-module.e2e-spec.ts`.
- Este projeto também está configurado para gerar relatórios de execução de testes e de coverage. Os de execução podem ser encotrados no diretório `reports` e os de coverage em `coverage`, ambos na raiz da aplicação.
- Os seguintes scripts estão configurados para a execução dos testes:
  - `test` - executa todos os testes da aplicação.
  - `test:watch` - executa os testes em watch mode.
  - `test:staged` - executa os testes relacionados aos arquivos da staging area do git.
  - `test:cov` - executa todos os testes da aplicação e gera o relatório de coverage.
  - `test:debug` - executa os testes no modo debug.
  - `test:e2e` - executa os testes e2e.

## Boas Práticas

### 1. Defina variáveis com nomes pronunciáveis e que façam sentido. Isso também serve para tipos, funções e etc.

**Bad:**

```ts
type DtaRcrd102 = {
  genymdhms: Date;
  modymdhms: Date;
  pszqint: number;
};
```

**Good:**

```ts
type Customer = {
  generationTimestamp: Date;
  modificationTimestamp: Date;
  recordId: number;
};
```

### 2. Defina variáveis com nomes que possam ser lidos e procurados com facilidade.

**Bad:**

```ts
// What the heck is 86400000 for?
setTimeout(restart, 86400000);
```

**Good:**

```ts
// Declare them as capitalized named constants.
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000; // 86400000

setTimeout(restart, MILLISECONDS_PER_DAY);
```

### 3. Evite mapeamento mental. Defina variáveis de forma explicita.

Explicit is better than implicit.
_Clarity is king._
**Bad:**

```ts
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

**Good:**

```ts
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

### 4. Use argumentos default ao invés de condicionais ou ternários.

**Bad:**

```ts
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10;
  // ...
}
```

**Good:**

```ts
function loadPages(count: number = 10) {
  // ...
}
```

### 5. Use enums para documentar a intenção do código.

**Bad:**

```ts
const GENRE = {
  ROMANTIC: 'romantic',
  DRAMA: 'drama',
  COMEDY: 'comedy',
  DOCUMENTARY: 'documentary',
};

configureFilm(GENRE.COMEDY);
```

**Good:**

```ts
enum GENRE {
  ROMANTIC,
  DRAMA,
  COMEDY,
  DOCUMENTARY,
}

configureFilm(GENRE.COMEDY);
```

### 6. Limite a quantidade de paramêtros de uma função/método para no máximo 2

**Bad:**

```ts
function createMenu(
  title: string,
  body: string,
  buttonText: string,
  cancellable: boolean,
) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

**Good:**

```ts
type MenuOptions = {
  title: string;
  body: string;
  buttonText: string;
  cancellable: boolean;
};

function createMenu(options: MenuOptions) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
});
```

### 7. Funções/métodos devem ter uma única responsabilidade.

**Bad:**

```ts
function emailActiveClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Good:**

```ts
function emailActiveClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

### 8. Nomes de funções/métodos devem dizer exatamente o que fazem.

**Bad:**

```ts
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

**Good:**

```ts
function addMonthToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();
addMonthToDate(date, 1);
```

## EXTRA: Commitlint, Husky e Commitzen

### Instalação do Commitlint:

```shell
npm install @commitlint/config-conventional @commitlint/cli --save-dev
```

É possível gerenciar as configurações do commitlint no arquivo commitlint.config.js

### Instalação do Husky:

```shell
npm install -g husky
npm install husky@^8.0.3 --save-dev
```

Adicione o script abaixo do husky no package.json

```
"scripts": {
  "prepare": "husky install"
}
```

Para finalizar adicione os arquivos "commit-msg" e "husky.sh" da pasta .husky como hooks; OBS: Em alguns casos sera adicionado um "undefined" no final de ambos arquivos, é necessário remover esse "undefined" de ambos, senão o hook do husky não irá funcionar!

```shell
npx husky add .husky/husky.sh
npx husky add .husky/commit-msg
npx husky add .husky/pre-commit
npx husky add .husky/pre-push
```

Neste projeto temos três hooks configurados:

- commit-msg: Hook executado quando um commit é realizado. Visa validar, juntamente com o commintlint, se todos os commits estão dentro do padrão estabelecido.
- pre-commit: Hook executado antes de todos os commits. Com o auxílio do lint-staged executa os testes e lint para todos os arquivos que foram alterados.
- pre-push: Hook executado antes do push para o repositório de origem. É utilizado para rodar os testes e lint de todo projeto antes de confirmar o push para a origem.

Para melhor entendimento do funcionamento dessa biblioteca, basta acessar o [guia](https://typicode.github.io/husky/guide.html) disponível na documentação oficial do Husky.

### Instalação do Commitzen:

```shell
npm install -g commitizen
npm install commitizen --save-dev
commitizen init cz-conventional-changelog
```

Adicione o script abaixo do commitzen no package.json

```
"scripts": {
  "commit": "git-cz"
}
```

Agora usando o commando "git-cz" será aberta uma interface onde você pode escolher qual o tipo de categoria do commit (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert); Selecionando a categoria você poderá digitar o escopo que pertence o commit, uma mensagem curta sobre o commit, e caso deseje adicionar mais detalhes também terá a opção de colocar uma descrição;

Caso tenha alguma dúvida ou queira personalizar mais a configuração, segue abaixo o artigo em que foi inspirado a implementação dessas ferramentas:

[Padronização de commit com (Commitlint, Husky e Commitizen)](https://dev.to/vitordevsp/padronizacao-de-commit-com-commitlint-husky-e-commitizen-3g1n)

# Referências

- [Husky](https://typicode.github.io/husky/)
- [CommitLint](https://commitlint.js.org/#/)
- [Commitzen](https://commitizen-tools.github.io/commitizen/)
- [Padronização de commit com (Commitlint, Husky e Commitizen)](https://dev.to/vitordevsp/padronizacao-de-commit-com-commitlint-husky-e-commitizen-3g1n)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [ESLint SonarJS](https://github.com/SonarSource/eslint-plugin-sonarjs/tree/master)
- [Prettier](https://prettier.io/)
- [Lint Staged](https://eslint.org/https://www.npmjs.com/package/lint-staged)
- [Jest](https://jestjs.io/pt-BR/)
- [docker](https://docs.docker.com/engine/install/)
- [The Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [The Catalog of Design Patterns](https://refactoring.guru/design-patterns/catalog)
- [SOLID with Typescript](https://github.com/labs42io/clean-code-typescript)
- [Google Typescript Style Guide](https://google.github.io/styleguide/tsguide.html)
