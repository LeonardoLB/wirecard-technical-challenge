# wirecard-technical-challenge


# Rodar aplicação

### Requisitos (Contenha instalado em sua máquina)

- MongoDb
- NodeJS
- Docker (Caso opte em utilizar)

### Subindo um container do MongoDB no Docker

```
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=mypassword \
    -d \
    mongo:4 \
```

### Criando um database dentro do MongoDb e um usuario para acessar essas informações.

```
docker exec -it mongodb \
    mongo --host localhost -u admin -p mypassword --authenticationDatabase admin \
    --eval "db.getSiblingDB('wirecard').createUser({user: 'myuser', pwd: 'mypassword', roles: [{role: 'readWrite', db: 'wirecard'}]})"
```
