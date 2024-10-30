import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Carros() {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    axios.get('/api/carros')
      .then(response => setCarros(response.data))
      .catch(error => console.error("Erro ao carregar carros:", error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Navbar />

      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Gerenciar Carros</h1>

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
        <Link href="/carros/novo" style={{ color: '#fff', textDecoration: 'none' }}>Adicionar Novo Carro</Link>
      </button>

      <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
        {carros.map((carro) => (
          <li key={carro._id} style={{ marginBottom: '10px', textAlign: 'center' }}>
            {carro.modelo} - {carro.marca} - {carro.placa} - {carro.ano}
            <Link href={`/carros/${carro._id}/editar`} style={{ marginLeft: '10px', color: '#d8b4ff', textDecoration: 'none' }}>Editar</Link>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}
