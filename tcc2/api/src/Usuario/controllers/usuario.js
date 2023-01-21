const { HttpStatusCode } = require("axios");

const { NotificarErroAoSlack } = require("../../exceptions");
const { checarSenhasIguais, criptografarSenha } = require("../services/senha");
const Usuario = require('../models/Usuario');

module.exports = {
  /**
   * Responsável pela criação do usuaário.
   * @param {express.Response} req 
   * @param {express.Request} res
   */
  criarUsuario: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        repeat_password,
        nome,
        sobrenome,
        rg,
        cpf,
        telefone
      } = req.body;

      if (!checarSenhasIguais(password, repeat_password)) {
        res.status(HttpStatusCode.Unauthorized).json({
          erro: "As senha e a repetição dela devem ser iguais"
        });
      }

      // checar se ja existe usuario com um email cadastrado
      
      // criptografar a senha
      const senhaCriptografada = await criptografarSenha(password);

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

      novoUsuario.save((err) => {
        if (err) throw new Error(err);
      });



      // res.send(bcrypt.compareSync(repeat_password, senhaCriptografada));
      // salvar o usuario no mongo

      // retornar sucesso


    } catch (error) {
      NotificarErroAoSlack('Usuario/controllers/usuario.js', error);
      res.status(HttpStatusCode.InternalServerError).json(error.message);
    }
  },
};
