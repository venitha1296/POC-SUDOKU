import React ,{ useState,useEffect }from "react";
import DifficultyModal from '../GameBoard/DifficultyModal';
import {Button} from 'react-bootstrap';
import store from '../../Reducer/Store';
import { useSelector } from 'react-redux/es/exports';
import Register from '../Register/Register'
import './home.css';

const Home = () => {
  const [isOpen,setShow] = useState(false);
  const name = useSelector(state => state.name);

  const openModal = () =>{
    setShow(true);
  }

  const closeModal = () =>{
    setShow(false);
  } 

  const handleSubmit = (name) => {
    store.dispatch({type: name,payload:name!=''? name : ''});
    setShow(false);
  }

  return (
     <header className='header'>
      <div className='logo'>Sudoku Game</div>
      {
        name != undefined &&
          <div className="welcome">Welcome, {name}</div>   
      }   
      <nav className='nav'>
        <ul>
         {
          name == undefined && <li>
          <Button variant="light" onClick={openModal}>REGISTER</Button>{isOpen ? 
            <Register 
            closeModal={closeModal}
            isOpen ={isOpen}
            handleSubmit = {handleSubmit}
            /> : ''}
        </li>  
         }   
           
          <li><DifficultyModal name={name}/> </li>        
        </ul>      
      </nav>
     </header>
  );
 
};
  
export default Home;