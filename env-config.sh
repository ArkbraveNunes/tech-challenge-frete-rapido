#! /bin/bash

if [ ! -f .env ]
then
    cp .env.example .env
    code .env

    read -p "Arquivo .env gerado, antes de rodar a aplicação é necessário adicionar as credencias para a utilização da API externa Frete Rápido ( API_FRETE_RAPIDO__TOKEN | API_FRETE_RAPIDO__CNPJ | API_FRETE_RAPIDO__CODE | API_FRETE_RAPIDO__CEP )" edited
fi
