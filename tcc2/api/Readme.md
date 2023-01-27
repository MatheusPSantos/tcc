
## Como testar a API
Você pode testar as chamadas da API localmente através do **Insomnia**.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Api%20Rest&uri=https%3A%2F%2Fgithub.com%2FMatheusPSantos%2Ftcc%2Fblob%2Fmain%2Ftcc2%2Fapi%2Fdocumentation%2Finsomnia.json)



> Como rodar o banco de dados
```bash
docker run  --name mongodb-tcc -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo
```

`CHAVE_PRIVADA_ASSINANTE` é obtida ao rodar o comando `npx hardhat node`, que disponibiliza 20 contas de teste local com chave privada. Basta seleciona uma delas.