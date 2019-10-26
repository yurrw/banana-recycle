**Implantação do sistema usando Docker(Recomendado):**

### **1 - Instale o Docker** ###
Siga os passos de instalação do Docker em [https://docs.docker.com/engine/installation/]
Recomendamos instalar o Docker Community Edition

### **2 - Instale o Docker Compose**
Siga os passos de instalação do Docker Compose em [https://docs.docker.com/compose/install/]

### **3 - Cria uma rede virtual para ser usada entre o banco de dados e a API** ###
docker network create tnet
### **3.1 - Cria um volume para o banco de dados** ###
docker volume create --name=pgdata

### **4 - Inicie a execução do servidor** ###
docker-compose up -d

A primeira execução do comando acima irá baixar e criar as imagens necessárias para execução do sistema.

### **5 - Crie as tabelas no banco** ###
docker exec -it geodocks-backend_api_1 python3 manage.py migrate

### **6 - Popule as tabelas no banco com os dados inicias** ###
docker exec -it geodocks-backend_api_1 python3 manage.py migrate

### **7 - (Opcional) Você pode conectar com o banco através da porta 2346** ###
Isso pose ser útil em caso de backup dos dados. Essa porta é configurável, e isso é feito no arquivo docker-compose no item ports do serviço db.

### **8 - Utilizando o docker
docker exec -it geodocks-backend_api_1 python3 manage.py makemigrations --empty c 
