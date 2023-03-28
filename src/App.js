import {useState} from 'react'
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Digite algum CEP!");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }
    catch{
      alert("Erro ao buscar CEP!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <title>Buscador CEP</title>
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP..." value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="buttonSearch"><FiSearch size={25} color="FFF" onClick={handleSearch}/></button>
      </div>
      {
        Object.keys(cep).length > 0 && (
          <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
        )
      }
      </div>
  );
}

export default App;
