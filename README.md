<p align="center">
  <img src="https://i.postimg.cc/v8LJgYJF/to-do-gym.png">
</p>

## Descrição

API/Back-end da aplicação To-do Gym.
Uma aplicação web para controle de treinos, rotinas, evolução física e musculação na academia, além de demonstração da execução de exercícios físicos.
Desenvolvida com TypeScript em [NodeJS](https://nodejs.org/) com o framework [Nest](https://github.com/nestjs/nest).

### Modelagem de Banco de Dados

<div align="center">
  <img src="https://i.postimg.cc/59Drv4z4/to-do-gym-drawio.png">
</div>

Acesse [Draw IO](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=to-do_gym#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1INebgsRbgjSd2onzwfBrgx-lUyiCDaGn%26export%3Ddownload)

### Funcionalidades

<div align="center">
  <img src="https://i.postimg.cc/jqwcwtLq/App-Gym.jpg">
</div>

Acesse [Miro](https://miro.com/app/board/uXjVMJ3Hzc8=/?share_link_id=536868401744)

### Documentação Modular Estática

Documentação de estrutura da aplicação gerada com [Compodoc](https://compodoc.app/)

### Documentação de Endpoints com Swagger

[https://todo-gym-api.onrender.com/swagger/](https://todo-gym-api.onrender.com/swagger/)

## Tecnologias Utilizadas

Linguagem: TypeScript<br />
Back-end: NodeJS<br />
Framework Node: NestJS<br />
Banco de Dados: MongoDB<br />
ODM Mongoose<br />
Documentação API Rest: Swagger<br />
Documentação Modular Estática: Compodoc<br />
Diagramação Banco de Dados: Draw IO
Desenho de Fluxos: Miro

## Instalação

Faça um clone do projeto em seu ambiente local

```bash
# clone
$ git clone https://github.com/flaviosoliver/todo-gym-api.git
```

Instale as dependências necessárias

```bash
npm install
```

## Para executar o projeto

Crie em seu ambiente local, na raiz do diretório do projeto um arquivo `.env` e adicione as seguintes variáveis nele:

```yml
MONGO_LOCAL='mongodb://127.0.0.1:27017'
ENVIRONMENT_LOCAL='development'
PORT=3000
JWT_SECRET='password'
JWT_REFRESH_SECRET='password'
```

Execute o projeto no modo desejado

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Executar via Docker

\*Em breve: Implementação futura

```bash
docker-compose up -d --build
```

## Testes

\*Em breve: Implementação futura

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Sobre mim

- Author - [Flávio Oliveira](https://github.com/flaviosoliver)
- Portfólio - [https://flaviosoliver-portfolio.vercel.app/](https://flaviosoliver-portfolio.vercel.app/)
- LinkedIn - [https://www.linkedin.com/in/flaviosoliver/](https://www.linkedin.com/in/flaviosoliver/)
- Email - [flavsoliver@gmail.com](mailto:flavsoliver@gmail.com)
