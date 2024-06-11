# Eptran API

Backend do EPTRAN

## Pré-requisitos

Para iniciar este projeto, você precisa ter o Docker instalado em sua máquina.

## Iniciando o Projeto

1. Clone este repositório para a sua máquina local.
2. Navegue até a pasta do projeto.
3. Execute o seguinte comando para iniciar o projeto:

```bash
docker-compose up
```

Após executar esses passos, o projeto deve estar rodando em sua máquina local.

## Realizando as Migrações

Para realizar as migrações do banco de dados, você deve utilizar o seguinte comando:

```bash
docker exec -it eptran-back-end-app-1 npx sequelize-cli db:migrate
```

## Acessando o PhpMyAdmin

O PhpMyAdmin está configurado para rodar na porta 8080. Você pode acessá-lo navegando para `http://localhost:8081` em seu navegador web.

## Documentação

A documentação para este projeto está disponível no Swagger. Você pode acessá-la navegando para `http://localhost:5000/documentation` em seu navegador web.

Esperamos que você aproveite este projeto!

