import React from 'react';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import "./App.css";
import MainComponent from './Components/LandingPage/MainComponent';
import { Routes,Route } from 'react-router-dom';
import HomePage from "./pages/Home";
import DashBoardPage from './pages/DashBoard';
import CoinPage from './pages/Coin';
import ComparePage from './pages/Compare';
import WatchlistPage from './pages/watchlist';
function App() {
  return (
    <div className='App'>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<DashBoardPage/>} />
        <Route path="/coin/:id" element={<CoinPage/>}/>
        <Route path="/compare" element={<ComparePage/>}/>
        <Route path="/watchlist" element={<WatchlistPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;