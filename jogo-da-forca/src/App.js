import React, { useState, useEffect } from 'react';
import './App.css';

const palavras = [
  'CACHORRO', 'GATO', 'ELEFANTE', 'PASSARINHO', 'LARANJA',
  'BANANA', 'CARRO', 'AVIÃO', 'CASA', 'ESCOLA'
];

function App() {
  const [palavra, setPalavra] = useState('');
  const [letrasCertas, setLetrasCertas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [erros, setErros] = useState(0);

  useEffect(() => {
    // Escolhe uma palavra aleatória no início
    setPalavra(palavras[Math.floor(Math.random() * palavras.length)]);
  }, []);

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  function verificaLetra(letra) {
    if (palavra.includes(letra)) {
      if (!letrasCertas.includes(letra)) {
        setLetrasCertas([...letrasCertas, letra]);
      }
    } else {
      if (!letrasErradas.includes(letra)) {
        setLetrasErradas([...letrasErradas, letra]);
        setErros(erros + 1);
      }
    }
  }

  function reiniciar() {
    setPalavra(palavras[Math.floor(Math.random() * palavras.length)]);
    setLetrasCertas([]);
    setLetrasErradas([]);
    setErros(0);
  }

  const ganhou = palavra.split('').every(letra => letrasCertas.includes(letra));
  const perdeu = erros >= 6;

  return (
    <div className="container">
      <h1>Jogo da Forca</h1>

      <div className="palavra">
        {palavra.split('').map((letra, i) => (
          <span key={i} className="letra">
            {letrasCertas.includes(letra) || perdeu ? letra : '_'}
          </span>
        ))}
      </div>

      <div className="letras-erradas">
        <p>Letras erradas: {letrasErradas.join(', ')}</p>
      </div>

      <div className="alfabeto">
        {letras.map((letra) => (
          <button
            key={letra}
            onClick={() => verificaLetra(letra)}
            disabled={ganhou || perdeu || letrasCertas.includes(letra) || letrasErradas.includes(letra)}
            className={
              letrasCertas.includes(letra)
                ? 'certa'
                : letrasErradas.includes(letra)
                ? 'errada'
                : ''
            }
          >
            {letra}
          </button>
        ))}
      </div>

      {(ganhou || perdeu) && (
        <div className={`mensagem ${ganhou ? 'ganhou' : 'perdeu'}`}>
          {ganhou ? `🎉 Parabéns! Você acertou a palavra: ${palavra}` : `💀 Você perdeu! A palavra era: ${palavra}`}
        </div>
      )}

      <button onClick={reiniciar} className="reiniciar-btn">🔄 Reiniciar</button>
    </div>
  );
}

export default App;
