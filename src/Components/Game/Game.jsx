import { Fragment, useState } from 'react';
import '../Game.css';
import Swal from "sweetalert2";
import {Row,Col} from 'react-bootstrap';
import flatten from 'lodash/flatten';
import Back from '../Back/Back';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: "colored-toast",
      icon: "white-toast-icon",
    },
    timer: 3000,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const box_color = {
  '0': '#90CAF9', // Box 1
  '30': '#1DE9B6', // Box 2
  '60': '#FFAB91', // Box 3
  '3': '#D1C4E9', // Box 4
  '33': '#FFF59D', // Box 5
  '63': '#A5D6A7', // Box 6
  '6': '#80CBC4', // Box 7
  '36': '#F48FB1', // Box 8
  '66': '#81D4FA', // Box 9
};

function Game(props) {
    let _ = require('lodash'); 
    let complete = false;
    let error_color = [];
    let initial = props.board; // getting input value based on difficluty
    
    const name=props.name;
    const [randomArray,setRandomArray] = useState(initial);
    const [row_array,setRowErrorArray] = useState(error_color);
    const [col_array,setColErrorArray] = useState(error_color);
    const [win_color,setWinColor] = useState(0);

    let array = [0,1,2,3,4,5,6,7,8];
    let count = 0;
    let rows = [],cols = [];
    const getSudokuArray = (arr) => {
        return JSON.parse(JSON.stringify(arr));
    }

    const ToastAlert = (icon, title) => {
      return Toast.fire({
        target: document.getElementById("form-modal"),
        icon: `${icon}`,
        title: `${title}`,
      });
    }

    const editBox = (e,row,col) =>{
        let currentValue = (e.target.value) ?  parseInt(e.target.value) : -1;
        let grid = getSudokuArray(randomArray);
        if(currentValue === -1 || currentValue >=1 && currentValue <= 9){
            grid[row][col] = currentValue;
        }
        setRandomArray(grid);
    }

    const rowCheck = (grid,num) =>{ //checking whether each row has unique values
      let row_check_array = _.without(grid[num],-1,0);  
      if(_.uniq(row_check_array).length == row_check_array.length){
        return true;
      }
      else{
        rows.push(num);
        return false;
      }
    }

    const colCheck = (grid,num) =>{ //checking whether each column has unique values
      const arrayColumn = (arr, n) => arr.map((x) => x[n]);
      let col_check_array = _.without(arrayColumn(grid, num),-1,0);
      if(_.uniq(col_check_array).length == col_check_array.length){
        return true;
      }
      else{
        cols.push(num);
        return false;
      }
    }

    const checkValid = (grid,num) =>{  // checking unique value(based on row,col,and box(3x3))
      if(rowCheck(grid,num) && colCheck(grid,num) ){
        return true;
      }
      else{
        count++;
        return false;
      }
    }

    const getNextData = (row,col) =>{  //Getting next row and column value for iterate array
      return col !=8 ? [row,col+1] : ((row !=8) ? [row+1,0] : [0,0]);
    }

    const onClearSuduku = () => { // Empty all values
      let reset_array = getSudokuArray(initial);
      setRowErrorArray(error_color);
      setColErrorArray(error_color);
      setRandomArray(reset_array);
      setWinColor(0);
    }

    const solvedArray = (grid,row = 0,col = 0) => {  
        for(let n=0;n<9;n++){   
          if(checkValid(grid,n) == 1){
            [row,col] = getNextData(row,col);
          }     
          else{
            setRowErrorArray(rows);
            setColErrorArray(cols)
          }      
        }       
    }
  
    const isComplete = (grid) => { // To check whether all cell is filled with correct value
        let values = flatten(grid);
        let list = {};
        values.map((val) => list[val] = list[val] ? list[val] + 1 : 1);
        delete list['-1'];delete list['0'];
        var total = Object.keys(list).reduce((total, key) => total + list[key], 0);
        return total === 81 ? true : false;      
    }

    const onSolveSuduku = () => { 
      let temp_array = getSudokuArray(initial);
      let message = ''
      if(_.isEqual(temp_array,randomArray)){
        message = "Oh! "+name+", You did not enter any value";
        ToastAlert("error", message);
        setRowErrorArray(error_color);
        setColErrorArray(error_color);
        setWinColor(0);
        setRandomArray(initial);
      }
      else{
        complete = isComplete(randomArray);
        solvedArray(randomArray);
        if(count == 0){
          setRowErrorArray(error_color);
          setWinColor(0);
          setColErrorArray(error_color);
        }
        if(complete && count == 0){
          setWinColor(1);
          message = "Wow Congrats! "+name+", You have solved the puzzle.";
          ToastAlert("success", message);
          // setRandomArray(temp_array);
        }
        else if(count > 0){
          setWinColor(0);
          message = "Oh! "+name+", Duplicate value.Please Check it";
          ToastAlert("error", message);
        }
        else{
          setWinColor(0);
          message = "Superb "+name+", Keep going!";
          ToastAlert("info", message);
        }
      }
     
    }
 
    const getBoxColor = (row, col) => {
      let rowGroup = row - (row % 3); // uppermost row index of the box
      let colGroup = (col - (col % 3)) * 10; // leftmost col index of the box * 10
      return box_color[rowGroup + colGroup];
    };

    return (
      <Fragment>
        <header className='header'>
            <div className='logo'>Sudoku Game</div>
             {
                name != undefined &&
                  <div className="welcome">Welcome, {name}</div>
              
              }   
            <nav className='nav'><Back /></nav>
        </header>
        <main className='main'>    
          <table>
            <tbody>
              { 
                array.map((row,rowIndex) => {
                  return  <tr key={rowIndex} className={(row +1) % 3 == 0 ? 'rBorder'  : ''}>
                    {
                      array.map((col,colIndex) => {
                        return <td key = {rowIndex + colIndex} className={(col+1) % 3 == 0 ? 'cBorder': ''}>
                           <input 
                            onChange = {(e)=>editBox(e,row,col)}
                            className = 'cellInput' 
                            style={row_array.includes(row) || col_array.includes(col)? {backgroundColor: 'red'} :win_color == 1 ? {backgroundColor: 'green'} : {backgroundColor: getBoxColor(row, col)} }
                            value={randomArray[row][col] === -1 || randomArray[row][col] === '0' || randomArray[row][col] === 0 ? '' : randomArray[row][col] }  
                            disabled = {initial[row][col] != -1 && initial[row][col] != '0'}
                           />
                        </td>
                      })
                    }
                  </tr>
                })            
              }
            </tbody>
          </table>       
          <div className='Footer'>
            <Row>&nbsp;&nbsp;
              <Col xs={6} md={6}>
                <button className='ClearButton' onClick={onClearSuduku}>Reset </button> 
              </Col>
              <Col xs={4} md={4}>
                { complete && <button className='SubmitButton' onClick={onSolveSuduku}>Finish </button>}
                { !complete && <button className='SubmitButton' onClick={onSolveSuduku}>Check </button>}
              </Col>
            </Row>
          </div>
        </main>
      </Fragment>
    );
}
  
  export default Game;

 