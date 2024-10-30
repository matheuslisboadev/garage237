import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #f5f5f5;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #333;
  align-self: flex-start;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ nome, email, senha });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="nome">Nome:</Label>
        <Input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="senha">Senha:</Label>
        <Input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <Button type="submit">Cadastrar</Button>
    </Form>
  );
}

export default Cadastro;
