/**
 * Service para gerenciamento do CRUD do usuário.
 */
const { stringToHex } = require('../../utils');
const { criptografarSenha } = require('./senha');

const EmailEUsername = require('../models/EmailEUsername');
const Usuario = require('../models/Usuario');


async function criarUsuario({ username, email, password, nome, sobrenome, rg, cpf, telefone }) {
  const jaExiste = await emailEUsernameJaCadastrado(email, username); // checar se ja existe usuario com um email cadastrado

  if (jaExiste) {
    throw new Error("Este email ou username já está sendo utilizado.");
  }

  const senhaCriptografada = await criptografarSenha(password); // criptografar a senha

  const novoUsuario = new Usuario({
    username,
    email,
    password: senhaCriptografada,
    nome,
    sobrenome,
    rg,
    cpf,
    telefone
  });

  novoUsuario.save(async (err) => {
    if (err) {
      await removerEmailUserSalvo(email, username)
        .then(resultado => {
          throw new Error(err);
        });
    }
  });
  await salvarHashEmailComUsername(email, username); // salvar username e email hasheado
  return novoUsuario;
}

async function excluirUsuario({ email }) {
  await EmailEUsername.findOneAndDelete({ email: stringToHex(email) });
  return await Usuario.findOneAndDelete({ email: email });
}

/**
 * Validação é feita pelo e-mail.
 * Um email não pode pertencer a mais de um username.
 * Não pode haver mais de um username com mesmo nome.
 * Caso usuário já exista, retorna true.
 * @param {string} email
 * @param {string} username
 * @returns {boolean}
 */
async function emailEUsernameJaCadastrado(email, username) {
  const usernameExistente = await EmailEUsername.findOne({ username: stringToHex(username) }).lean();
  if (usernameExistente) return true;
  const emailExistente = await EmailEUsername.findOne({ email: stringToHex(email) }).lean();
  if (emailExistente) return true;

  return false;
}

/**
 * Faz o hash do email e salva junto com o username.
 * 
 * @param {string} email 
 * @param {string} username 
 * @returns {Object}
 */
async function salvarHashEmailComUsername(email, username) {
  const emailEUsername = new EmailEUsername({
    email: stringToHex(email), username: stringToHex(username)
  });

  emailEUsername.save((err) => {
    if (err) throw new Error(err);
  });

  return emailEUsername;
}

/**
 * Em caso de falha desfaz o processo da função ``salvarHashEmailComUsername()``
 */
async function removerEmailUserSalvo(email, username) {
  await EmailEUsername.findOneAndDelete({ username: stringToHex(username), email: stringToHex(email) });
}

module.exports = {
  criarUsuario,
  excluirUsuario,
}