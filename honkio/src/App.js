import { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { WalletContext } from './contexts/WalletContext';
import './styles/App.css';

function App() {  
  const [wallet, setWallet] = useState();

  function saveWallet (signer) {
    setWallet(signer)
  }

  return (
    <WalletContext.Provider value={{ wallet, saveWallet }}>
      <div className="App">
        <Header/>
        <Main />
        <Footer/>
      </div>
    </WalletContext.Provider>
  );
}

export default App;
