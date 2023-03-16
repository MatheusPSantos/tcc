const { createClient } = require('../../setup');

let client;

describe('Fazer login.', () => {
  const dadosUsuarioMock = {
    nome: "Júlio",
    sobrenome: "Pereira",
    email: "Carla.Braga29@gmail.com",
    username: "CarlaBraga29",
    rg: "12345-6",
    cpf: "123.456.789-10",
    telefone: "(57) 6756-6692",
    password: "12345",
    repeat_password: "12345"
  };

  const dadosLogin = {
    email: dadosUsuarioMock.email,
    password: dadosUsuarioMock.password
  };


  beforeAll(async () => {
    client = await createClient();
  });

  const cadastrarUsuarioBlockchain = async (dados) => {
    return await client.post('/blockchain/salvar/usuario').send(dados);
  };

  it('Deve retornar mensagem se usuário não existe na Blockchain.', async () => {
    const response = await client.post('/blockchain/login/usuario')
      .send(dadosLogin);

    expect(response).toHaveProperty('status', 404);
    expect(response).toHaveProperty('text', 'Usuário não existe.');
  });

  it('Deve retornar um token se usuário existe na Blockchain.', async () => {
    const response = await cadastrarUsuarioBlockchain(dadosUsuarioMock);
    console.log(`response >> ${JSON.stringify(response)}`);
  });
});