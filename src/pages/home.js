import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './home.module.css';
import Link from 'next/link';



export default function Home() {
  const [carros, setCarros] = useState([]);
  const [garagens, setGaragens] = useState([]);

  useEffect(() => {
    // Buscar carros e garagens da API
    axios.get('/api/carros')
      .then(response => setCarros(response.data))
      .catch(error => console.error("Erro ao carregar carros:", error));

    axios.get('/api/garagens')
      .then(response => setGaragens(response.data))
      .catch(error => console.error("Erro ao carregar garagens:", error));
  }, []);

  // Função para obter informações da garagem do carro
  const getGaragemInfo = (garagemId) => {
    const garagem = garagens.find(g => g._id === garagemId);
    return garagem ? `${garagem.nome} - ${garagem.localizacao}` : 'Garagem não especificada';
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/home" className={styles.navItem}>Home</Link>
        <Link href="/carros" className={styles.navItem}>Carros</Link>
        <Link href="/garagens" className={styles.navItem}>Garagens</Link>
      </nav>

      <div className={styles.mainContent}>
        <h1 className={styles.title}>Bem-vindo ao MyGarage</h1>

        <h2 className={styles.subtitle}>Garagens</h2>
        <ul>
          {garagens.map((garagem) => (
            <li key={garagem._id} className={styles.garagemItem}>
              {garagem.nome} - {garagem.localizacao}
              <Link href={`/garagens/${garagem._id}/editar`} className={styles.editLinkg}>Editar</Link>
            </li>
          ))}
        </ul>

        <h2 className={styles.subtitle}>Carros</h2>
        <div className={styles.cardsContainer}>
          {carros.map((carro) => (
            <div key={carro._id} className={styles.card}>
              <img src={carro.imagemUrl || 'https://via.placeholder.com/150'} alt={carro.modelo} className={styles.cardImage} />
              <h3 className={styles.cardTitle}>{carro.modelo}</h3>
              <p className={styles.cardText}>Marca: {carro.marca}</p>
              <p className={styles.cardText}>Cor: {carro.cor}</p>
              <p className={styles.cardText}>Ano: {carro.ano}</p>
              <p className={styles.cardText}>Placa: {carro.placa}</p>
              <p className={styles.cardText}>Garagem: {getGaragemInfo(carro.garagemId)}</p>
              <Link href={`/carros/${carro._id}/editar`} className={styles.editLink}>Editar</Link>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2024 MyGarage. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
