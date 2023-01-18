const criarUsuario = async (req, res) => {
  console.log('ler dados da request');
  console.log('conectar com a blockchain');
  console.log('aguardar a criacao');
  console.log('retornar com usuario criado');
  console.log(req.body);
  return res.status(200).json({...req.body});
};

module.exports = {
  criarUsuario,
};
