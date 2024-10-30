import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function NovoCarro() {
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [placa, setPlaca] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [garagemId, setGaragemId] = useState('');
  const [garagens, setGaragens] = useState([]);

  useEffect(() => {
    axios.get('/api/garagens')
      .then(response => setGaragens(response.data))
      .catch(error => console.error("Erro ao carregar garagens:", error));
  }, []);

  const handlePlacaChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 4) {
      value = value.slice(0, 4) + '-' + value.slice(4, 8);
    }
    setPlaca(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/carros', {
      modelo, marca, ano, cor, placa, imagemUrl, garagemId
    })
      .then(() => {
        alert("Carro adicionado com sucesso!");
        window.location.href = '/carros';
      })
      .catch(error => console.error("Erro ao adicionar carro:", error));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '120vh' }}>
      <Navbar />
      <main style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '30px' }}>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Adicionar Novo Carro</h1>
        <form onSubmit={handleSubmit} className="form" style={{ width: '100%', maxWidth: '500px', background: '#f0e4ff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <input placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
          <input placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} />
          <input placeholder="Ano" type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
          <input 
            type="text" 
            value={placa} 
            onChange={handlePlacaChange} 
            maxLength="9" 
            placeholder="XXXX-0000" 
          />
          <input placeholder="Cor" value={cor} onChange={(e) => setCor(e.target.value)} />
          <input placeholder="URL da Imagem" value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} />

          <select value={garagemId} onChange={(e) => setGaragemId(e.target.value)}>
            <option value="">Selecione a Garagem</option>
            {garagens.map((garagem) => (
              <option key={garagem._id} value={garagem._id}>{garagem.nome}</option>
            ))}
          </select>

          <button type="submit" style={{ marginTop: '20px' }}>Adicionar Carro</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
