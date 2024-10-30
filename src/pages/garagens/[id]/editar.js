import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function EditarGaragem() {
  const router = useRouter();
  const { id } = router.query;
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (router.isReady && id) {
      axios.get(`/api/garagens/${id}`)
        .then(response => {
          setNome(response.data.nome);
          setLocalizacao(response.data.localizacao);
          setCarregando(false);
        })
        .catch(error => {
          console.error("Erro ao carregar garagem:", error);
          setCarregando(false);
        });
    }
  }, [router.isReady, id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/garagens/${id}`, { nome, localizacao })
      .then(() => {
        alert("Garagem atualizada com sucesso!");
        router.push('/garagens');
      })
      .catch(error => console.error("Erro ao atualizar garagem:", error));
  };

  if (carregando) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div>
      <Navbar/>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Editar Garagem</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
          Nome da Garagem:
          <input
            type="text"
            placeholder="Nome da Garagem"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ display: 'block', marginTop: '5px', padding: '10px', width: '100%', maxWidth: '300px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Localização:
          <input
            type="text"
            placeholder="Localização"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            style={{ display: 'block', marginTop: '5px', padding: '10px', width: '100%', maxWidth: '300px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: '#c3a4e6',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginTop: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#af92d6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#c3a4e6';
          }}
        >
          Salvar Alterações
        </button>
      </form>
      
      <Footer/>
    </div>
  );
}
