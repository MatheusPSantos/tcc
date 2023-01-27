
> Como rodar o banco de dados
```bash
docker run  --name mongodb-tcc -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo
```

`CHAVE_PRIVADA_ASSINANTE` é obtida ao rodar o comando `npx hardhat node`, que disponibiliza 20 contas de teste local com chave privada. Basta seleciona uma delas.