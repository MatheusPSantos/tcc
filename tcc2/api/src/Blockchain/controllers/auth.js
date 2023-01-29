require('dotenv').config();

const { HttpStatusCode } = require("axios");
const { NotificarErroAoSlack } = require("../../exceptions");
const { ABI } = require('../../../contracts');
const { Web3HttpProvider, getAssinante } = require('../../providers/blockchain');

const web3 = Web3HttpProvider();
const assinante = getAssinante(web3);

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.clear();
    const chamarABI = await ABI.getContratoABI('Usuario');
    const usuarioContratoABI = chamarABI.abi;
    const contratoInteligente = new web3.eth.Contract(
      usuarioContratoABI, process.env.USUARIO_CONTRACT_ADDRESS
    );
    const estaLogado = await contratoInteligente.methods
      .verificarSeUsuarioEstaLogado(email)
      .call();

    /** @todo verificar como trabalhar com os tokens */
    if (estaLogado) { }// fazer chamada retornar um token
    // function fazerLogin(string memory _password, string memory _email)
    const transacao = contratoInteligente.methods.fazerLogin(
      password, email
    );

    const receipt = await transacao.send({ from: assinante.address, gas: await transacao.estimateGas() })
      .once('transactionHash', txHash => {
        console.info('Mineirando transação ...');
        console.info(`https://${network}.etherscan.io/tx/${txHash}`);
      });
    console.info(`Bloco mineirado: ${receipt.blockNumber}`);

    res.status(HttpStatusCode.Ok).json({
      token: ``,
      estaLogado,
    });

    // if(usuarioContractAbi)
    // verificar se o usuario está logado verificarSeUsuarioEstaLogado(string memory _email)
    // se tiver -> madar o token
    // se n tiver -> logar e retornar o token


  } catch (error) {
    NotificarErroAoSlack('Blockchain/controllers/auth.js', error);
    res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
    throw new Error(error);
  }
}


module.exports = {
  login
};