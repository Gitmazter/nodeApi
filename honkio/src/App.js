import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import './styles/App.css';

function App() {

  /* 
  Pages
  Home
  Explorer
  Account Dashboard
  Mint NFT
  Whitepaper
      Usecase : HONK
      Roadmap : Stage1 Honk, stage 2; double honk
      Coin: $GOOS GooseCoin
      Future Predictions? : Honks (arrow up)
  */

  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
