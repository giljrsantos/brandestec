import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
//import Main from './pages/client/main/index';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
