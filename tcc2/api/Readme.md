
> Como rodar o banco de dados
```bash
docker run  --name mongodb-tcc -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo
```