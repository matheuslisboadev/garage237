import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


export default function NovaGaragem() {
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/garagens', {
      nome, localizacao
    })
      .then(() => {
        alert("Garagem adicionada com sucesso!");
        window.location.href = '/garagens';
      })
      .catch(error => console.error("Erro ao adicionar garagem:", error));
  };

  return (
    <div>
      <Navbar/>

      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Adicionar Nova Garagem</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da Garagem"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Localização"
        value={localizacao}
        onChange={(e) => setLocalizacao(e.target.value)}
      />
      <button type="submit">Adicionar Garagem</button>
    </form>
    <Footer/>

    </div>
  );
}
