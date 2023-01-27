// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Contract Auth para autenticacao
 * @author matheuspsantos
 */
contract Usuario {
    uint public contadorUsuario = 0;

    struct DetalheUsuario {
        string username;
        string email;
        string nome;
        string sobrenome;
        string rg;
        string cpf;
        string telefone;
        string enderecoJSONString;
        string password;
        bool usuarioEstaLogado;
    }

    event usuarioCriado(
        string username,
        string email,
        string nome,
        string sobrenome,
        string rg,
        string cpf,
        string telefone,
        string enderecoJSONString,
        string password,
        bool usuarioEstaLogado
    );

    mapping(string => DetalheUsuario) public listaDeUsuarios;

    /**
     * Função que cria um usuario
     * @param _username _username
     * @param _email _email
     * @param _nome _nome
     * @param _rg _rg
     * @param _cpf _cpf
     * @param _telefone _telefone
     * @param _endereco Objeto Endereco que deve vir parseado pelo JSON.stringfy e será guardado como string
     * @param _password A senha já deve vir criptografado
     */
    function registrarUsuario(
        string memory _username,
        string memory _email,
        string memory _nome,
        string memory _sobrenome,
        string memory _rg,
        string memory _cpf,
        string memory _telefone,
        string memory _endereco,
        string memory _password
    ) public {
        listaDeUsuarios[_email] = DetalheUsuario(
            _username,
            _email,
            _nome,
            _sobrenome,
            _rg,
            _cpf,
            _telefone,
            _endereco,
            _password,
            false
        );

        emit usuarioCriado(
            _username,
            _email,
            _nome,
            _sobrenome,
            _rg,
            _cpf,
            _telefone,
            _endereco,
            _password,
            false
        );
    }

    /**
     * Função que realiza login
     * @param _password password do usuário
     * @param _email email do usuario
     * @return bool
     */
    function fazerLogin(string memory _password, string memory _email)
        public
        returns (bool)
    {
        if (
            (keccak256(abi.encodePacked(listaDeUsuarios[_email].password)) ==
                keccak256(abi.encodePacked(_password))) &&
            (keccak256(abi.encodePacked(listaDeUsuarios[_email].email)) ==
                keccak256(abi.encodePacked(_email)))
        ) {
            listaDeUsuarios[_email].usuarioEstaLogado = true;
            return listaDeUsuarios[_email].usuarioEstaLogado;
        } else {
            return false;
        }
    }

    /**
     * Função que checa se o usuário está logado
     * @param _email _email
     * @return bool
     */
    function verificarSeUsuarioEstaLogado(string memory _email)
        public
        view
        returns (bool)
    {
        return (listaDeUsuarios[_email].usuarioEstaLogado);
    }

    /**
     * Função que desloga o usuário
     * @param _email _email
     */
    function deslogarUsuario(string memory _email) public {
        listaDeUsuarios[_email].usuarioEstaLogado = false;
    }
}
