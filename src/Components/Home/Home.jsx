import React from "react";
import DifficultyModal from '../GameBoard/DifficultyModal';
import './home.css';

const Home = () => {
  return (
     <header className='header'>
      <div className='logo'>Sudoku Game</div>
      <nav className='nav'>
        <DifficultyModal />       
      </nav>
     </header>
  );
 
};
  
export default Home;