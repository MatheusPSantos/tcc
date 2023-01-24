require('dotenv').config();

const { HttpStatusCode } = require('axios');
const Web3 = require('web3');
const { JSON_RPC_SERVER, USUARIO_CONTRACT_ADDRESS, ABI } = require('../../../contracts');
const { NotificarErroAoSlack } = require('../../exceptions');
const path = require('path');
const { emailEUsernameJaCadastrado, excluirUsuario } = require('../../Usuario/services');

const web3 = new Web3(JSON_RPC_SERVER || '');

async function salvarUsuarioNaBlockchain(req, res) {
  try {
    const { username, email } = req.body;

    if (await emailEUsernameJaCadastrado(email, username)) {
      // salvar o usuario no BC
      const usuarioContractAbi = await ABI.getContratoABI('Usuario').then(res => res.abi);
      const contratoInteligente = new web3.eth.Contract(usuarioContractAbi, process.env.USUARIO_CONTRACT_ADDRESS);

      await excluirUsuario({ email });// excluir o usuario
      
      res.status(HttpStatusCode.Created).json({});
    }

    res.status(HttpStatusCode.NotFound).json({ error: 'Usuário não cadastrado.' })
  } catch (error) {
    NotificarErroAoSlack('salvarUsuarioNaBlockchain', error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
  }
}

module.exports = {
  salvarUsuarioNaBlockchain,
};


