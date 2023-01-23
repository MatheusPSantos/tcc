require('dotenv').config();

const Web3 = require('web3');
const { JSON_RPC_SERVER, USUARIO_CONTRACT_ADDRESS, ABI } = require('../../../contracts');

const web3 = new Web3(JSON_RPC_SERVER || '');

async function salvarUsuarioNaBlockchain(req, res) {
  const usuarioContractAbi = await ABI.getContratoABI('Usuario')
    .then(res => res.abi);

  const contratoInteligente = new web3.eth.Contract(usuarioContractAbi, process.env.USUARIO_CONTRACT_ADDRESS);


  res.json({ contratoInteligente });
}

module.exports = {
  salvarUsuarioNaBlockchain,
};


