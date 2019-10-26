#!/bin/bash
# Read Password
read -s -p "Enter Password para sudo e ssh: " password
echo

# echo $password | sudo -S -k whoami

echo "compilando produção..."
npm run deploy:prod

echo "sincronizando Git de producao, para manter sincronizado para consultas."
sshpass -p $password ssh -t alonso@geodocs.com.br 'git -C /home/alonso/Geodocs/geodocs-frontend/ pull'

echo
echo "parando Nginx em producão..."
sshpass -p $password ssh -t alonso@geodocs.com.br "echo ${password} | sudo -S -k service nginx stop"

echo
echo "copiando novos arquivos..."
sshpass -p $password scp -r ./dist/* alonso@geodocs.com.br:/var/www/geodocs/dist

echo
echo "iniciando Nginx em producão..."
sshpass -p $password ssh -t alonso@geodocs.com.br "echo ${password} | sudo -S -k service nginx start"

echo
echo "Pronto."

# sudo service nginx stop
# sudo npm run deploy
# sudo cp -a /home/alonso/Geodocs/geodocs-frontend/dist /var/www/geodocs/
# sudo service nginx start
