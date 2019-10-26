#!/bin/bash
read -s -p "Enter Password ssh: " password
echo

echo "compilando Homologação..."
npm run deploy:beta
echo "copiando novos arquivos..."
sshpass -p $password scp ./dist/* administrador@geodocs.cos.ufrj.br:/home/administrador/data/nginx/geodocs-page/
echo "Pronto."

# Read Password
# read -s -p "Enter Password: " password
# echo

# # Run Command
# echo $password
