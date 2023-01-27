require('dotenv').config();

const { HttpStatusCode } = require('axios');
const Web3 = require('web3');
const { ABI } = require('../../../contracts');
const { NotificarErroAoSlack } = require('../../exceptions');
const { excluirUsuario, consultarUsuario } = require('../../Usuario/services');
const network = process.env.EHTHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    process.env.JSON_RPC_SERVER,
  )
);

const assinante = web3.eth.accounts.privateKeyToAccount(process.env.CHAVE_PRIVADA_ASSINANTE);

async function salvarUsuarioNaBlockchain(req, res) {
  try {
    const { username, email } = req.body;
    const usuario = await consultarUsuario(email, username);
    if (usuario) {
      // salvar o usuario no BC
      const usuarioContractAbi = await ABI.getContratoABI('Usuario')
        .then(res => res.abi);
      if (usuarioContractAbi && Array.isArray(usuarioContractAbi)) {
        web3.eth.accounts.wallet.add(assinante);
        const contratoInteligente = new web3.eth.Contract(usuarioContractAbi, process.env.USUARIO_CONTRACT_ADDRESS);
        const transaction = contratoInteligente.methods.registrarUsuario(
          usuario.username,
          usuario.email,
          usuario.nome,
          usuario.sobrenome || '',
          usuario.rg || '',
          usuario.cpf,
          usuario.telefone,
          usuario.endereco,
          usuario.password
        );
        const receipt = await transaction
          .send({ from: assinante.address, gas: await transaction.estimateGas() })
          .once('transactionHash', txHash => {
            console.info('Mineirando transação ...');
            console.info(`https://${network}.etherscan.io/tx/${txHash}`);
          });
        console.info(`Bloco mineirado: ${receipt.blockNumber}`);
        const usuarioExcluido = await excluirUsuario(usuario).then(res => res.toJSON()); // excluir o usuario
        res.status(HttpStatusCode.Created).json({
          message: 'Transação bem-sucedida.',
          blockNumber: receipt.blockNumber,
          usuarioExcluidoDoMongoDB: { ...usuarioExcluido },
        });
      } else {
        res.status(HttpStatusCode.BadRequest).json({ error: 'Smart contract não possui ABI associado.' });
      }
    } else {
      res.status(HttpStatusCode.NotFound).json({ error: 'Usuário não existe.' });
    }
  } catch (error) {
    NotificarErroAoSlack('salvarUsuarioNaBlockchain', error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  salvarUsuarioNaBlockchain,
};


