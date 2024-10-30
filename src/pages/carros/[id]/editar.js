import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function EditarCarro() {
  const router = useRouter();
  const { id } = router.query;
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [placa, setPlaca] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [garagemId, setGaragemId] = useState('');
  const [garagens, setGaragens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (router.isReady && id) {
      axios.put(`/api/carros/${id}`)
        .then(response => {
          const carro = response.data;
          setModelo(carro.modelo || '');
          setMarca(carro.marca || '');
          setAno(carro.ano || '');
          setCor(carro.cor || '');
          setPlaca(carro.placa || '');
          setImagemUrl(carro.imagemUrl || '');
          setGaragemId(carro.garagemId || '');
          setCarregando(false);
        })
        .catch(error => console.error("Erro ao carregar carro:", error));

      axios.get('/api/garagens')
        .then(response => setGaragens(response.data))
        .catch(error => console.error("Erro ao carregar garagens:", error));
    }
  }, [router.isReady, id]);

  const handlePlacaChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (value.length > 4) {
      value = value.slice(0, 4) + '-' + value.slice(4, 8);
    }

    setPlaca(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/carros/${id}`, {
      modelo,
      marca,
      ano,
      cor,
      placa, 
      imagemUrl,
      garagemId
    })
      .then(() => {
        alert("Carro atualizado com sucesso!");
        router.push('/carros');
      })
      .catch(error => console.error("Erro ao atualizar carro:", error));
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este carro? Essa ação não poderá ser desfeita!")) {
      axios.delete(`/api/carros/${id}`)
        .then(() => {
          alert("Carro excluído com sucesso!");
          router.push('/carros');
        })
        .catch(error => console.error("Erro ao excluir carro:", error));
    }
  };

  if (carregando) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Editar Carro</h1>
        <form onSubmit={handleSubmit} style={{ background: '#f0e4ff', padding: '20px', borderRadius: '10px', width: '100%', maxWidth: '500px' }}>
          <label>Modelo:
            <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
          </label>
          <label>Marca:
            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
          </label>
          <label>Ano:
            <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
          </label>
          <label>Cor:
            <input type="text" value={cor} onChange={(e) => setCor(e.target.value)} />
          </label>
          <label>Placa:
            <input 
              type="text" 
              value={placa} 
              onChange={handlePlacaChange} 
              maxLength="9"
              placeholder="XXXX-0000"
            />
          </label>
          <label>URL da Imagem:
            <input type="text" value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} />
          </label>
          <label>Garagem:
            <select value={garagemId} onChange={(e) => setGaragemId(e.target.value)}>
              <option value="">Selecione a Garagem</option>
              {garagens.map((garagem) => (
                <option key={garagem._id} value={garagem._id}>{garagem.nome}</option>
              ))}
            </select>
          </label>
          <button type="submit">Salvar Alterações</button>
        </form>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '40px' }}>
          <button onClick={handleDelete} style={{ backgroundColor: '#e63946', color: '#fff', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
            Excluir Carro
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
  
}
