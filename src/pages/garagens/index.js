import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Garagens() {
  const [garagens, setGaragens] = useState([]);

  useEffect(() => {
    axios.get('/api/garagens')
      .then(response => setGaragens(response.data))
      .catch(error => console.error("Erro ao carregar garagens:", error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Navbar />
      
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Gerenciar Garagens</h1>
      
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
          backgroundColor: '#c3a4e6',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease, transform 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#af92d6';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#c3a4e6';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Link href="/garagens/nova" style={{ color: '#fff', textDecoration: 'none' }}>Adicionar Nova Garagem</Link>
      </button>

      <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
        {garagens.map((garagem) => (
          <li key={garagem._id} style={{ marginBottom: '10px', textAlign: 'center' }}>
            {garagem.nome} - {garagem.localizacao}
            <Link href={`/garagens/${garagem._id}/editar`} style={{ marginLeft: '10px', color: '#d8b4ff', textDecoration: 'none' }}>Editar</Link>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}
