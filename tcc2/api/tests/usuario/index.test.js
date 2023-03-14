// Jest Unit Test
describe('salvarUsuarioNaBlockchain', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        username: 'testUser',
        email: 'test@test.com',
        nome: 'Test',
        sobrenome: 'User',
        rg: '123456789',
        cpf: '12345678901',
        telefone: '1234567890',
        endereco: 'Test Address',
        password: 'testPassword',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should save user to blockchain', async () => {
    const usuario = {
      username: 'testUser',
      email: 'test@test.com',
      nome: 'Test',
      sobrenome: 'User',
      rg: '123456789',
      cpf: '12345678901',
      telefone: '1234567890',
      endereco: 'Test Address',
      password: 'testPassword',
    };
    const usuarioContractAbi = [{ name: 'registrarUsuario' }];
    const receipt = { blockNumber: 12345 };
    const usuarioExcluido = {
      username: 'testUser',
      email: 'test@test.com',
      nome: 'Test',
      sobrenome: 'User',
      rg: '123456789',
      cpf: '12345678901',
      telefone: '1234567890',
      endereco: 'Test Address',
      password: 'testPassword',
    };
    const expectedResponse = {
      message: 'Transação bem-sucedida.',
      blockNumber: 12345,
      usuarioExcluidoDoMongoDB: usuarioExcluido,
    };
    ABI.getContratoABI = jest.fn().mockResolvedValue({ abi: usuarioContractAbi });
    consultarUsuario = jest.fn().mockResolvedValue(usuario);
    excluirUsuario = jest.fn().mockResolvedValue({ toJSON: () => usuarioExcluido });
    web3.eth.accounts.wallet.add = jest.fn();
    web3.eth.Contract = jest.fn().mockReturnValue({
      methods: {
        registrarUsuario: jest.fn().mockReturnValue({
          send: jest.fn().mockReturnValue({
            once: jest.fn().mockResolvedValue(receipt),
          }),
          estimateGas: jest.fn().mockResolvedValue(12345),
        }),
      },
    });
    await salvarUsuarioNaBlockchain(req, res);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.Created);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should return an error if user does not exist', async () => {
    const expectedResponse = { error: 'Usuário não existe.' };
    consultarUsuario = jest.fn().mockResolvedValue(null);
    await salvarUsuarioNaBlockchain(req, res);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.NotFound);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should return an error if ABI is not found', async () => {
    const expectedResponse = { error: 'Smart contract não possui ABI associado.' };
    const usuario = {
      username: 'testUser',
      email: 'test@test.com',
      nome: 'Test',
      sobrenome: 'User',
      rg: '123456789',
      cpf: '12345678901',
      telefone: '1234567890',
      endereco: 'Test Address',
      password: 'testPassword',
    };
    ABI.getContratoABI = jest.fn().mockResolvedValue({ abi: null });
    consultarUsuario = jest.fn().mockResolvedValue(usuario);
    await salvarUsuarioNaBlockchain(req, res);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should return an error if an exception is thrown', async () => {
    const expectedResponse = { error: 'Error' };
    const error = new Error('Error');
    consultarUsuario = jest.fn().mockRejectedValue(error);
    NotificarErroAoSlack = jest.fn();
    await salvarUsuarioNaBlockchain(req, res);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
    expect(NotificarErroAoSlack).toHaveBeenCalledWith('salvarUsuarioNaBlockchain', error);
  });
});