// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Contract Auth para autenticacao
 * @author matheuspsantos
 */
contract Usuario {
    struct DetalheUsuario {
        address addr;
        string username;
        string email;
        string nome;
        string sobrenome;
        string rg;
        string cpf;
        string telefone;
        string enderecoJSONString;
        string password;
        string CNIC;
        bool usuarioEstaLogado;
    }

    mapping(address => DetalheUsuario) private user;

    /**
     * Função que cria um usuario
     * @param _address _address
     * @param _username _username
     * @param _email _email
     * @param _nome _nome
     * @param _rg _rg
     * @param _cpf _cpf
     * @param _telefone _telefone
     * @param _endereco Objeto Endereco que deve vir parseado pelo JSON.stringfy e será guardado como string
     * @param _password A senha já deve vir criptografada
     * @param _cnic _cnic
     * @return bool bool
     */
    function registrarUsuario(
        address _address,
        string memory _username,
        string memory _email,
        string memory _nome,
        string memory _sobrenome,
        string memory _rg,
        string memory _cpf,
        string memory _telefone,
        string memory _endereco,
        string memory _password,
        string memory _cnic
    ) public returns (bool) {
        require(user[_address].addr != msg.sender);

        user[_address].addr = _address;
        user[_address].username = _username;
        user[_address].email = _email;
        user[_address].nome = _nome;
        user[_address].sobrenome = _sobrenome;
        user[_address].rg = _rg;
        user[_address].cpf = _cpf;
        user[_address].telefone = _telefone;
        user[_address].enderecoJSONString = _endereco;
        user[_address].password = _password;
        user[_address].CNIC = _cnic;
        user[_address].usuarioEstaLogado = false;

        return true;
    }

    /**
     * Função que realiza login
     * @param _address _address
     * @param _password password do usuário
     * @param _email email do usuario
     * @return bool
     */
    function fazerLogin(
        address _address,
        string memory _password,
        string memory _email
    ) public returns (bool) {
        if (
            (keccak256(abi.encodePacked(user[_address].password)) ==
                keccak256(abi.encodePacked(_password))) &&
            (keccak256(abi.encodePacked(user[_address].email)) ==
                keccak256(abi.encodePacked(_email)))
        ) {
            user[_address].usuarioEstaLogado = true;
            return user[_address].usuarioEstaLogado;
        } else {
            return false;
        }
    }

    /**
     * Função que checa se o usuário está logado
     * @param _address _address
     * @return bool
     */
    function verificarSeUsuarioEstaLogado(address _address)
        public
        view
        returns (bool)
    {
        return (user[_address].usuarioEstaLogado);
    }

    /**
     * Função que desloga o usuário
     * @param _address _address
     */
    function deslogarUsuario(address _address) public {
        user[_address].usuarioEstaLogado = false;
    }
}
