import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
function Square(props){
  return(
    <button className= {props.classOne + ' square'} onClick={props.onClick}>{props.value}</button>
  )

}
class Board extends React.Component{
  /*constructor(props){
    super(props);
    //this.state.squares is a prop 
    //squares is an array
    this.state={
      squares:Array(9).fill(null),
      xIsNext: true,
    }
  }*/
  renderSquare(i){

    return<Square value={this.props.squares[i]} 
    onClick={()=> this.props.onClick(i) } classOne =  {this.props.ClassColorName}/>;
  }
  render(){
    /*const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = "Winner is" + winner
    }else{
      status = 'Next player:' + (this.state.xIsNext ? "X" : "O");
    }*/
    return(<div>
            <div className='board-row'>
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
    );
  }
}
class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history:[{
        squares:Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber : 0,
      color : "normalColor",
    }
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();//history is an object not just an array
    if(calculateWinner(squares)||squares[i]){      
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
    history : history.concat([{squares : squares}]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
  });
}
jumpTo(step){
  this.setState({
    stepNumber : step,
    xIsNext : (step % 2) === 0
  });
}
classTwoVal(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();//history is an object not just an array
    const winner  = calculateWinner(squares);
  }
  render(){
    const history = this.state.history;
    const current = history[this.state.stepNumber]; 
    const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>       
             <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
    let status;
    if(winner){
      status =  "Winner: " +winner[0] ;
      console.log(winner[3]);//winner is an array that keeps the indexes of the winner squares winner[3] = current.squares[i] if i==third x 
    //soloution: in the design get the div child and then style it
    this.state.color = "winnerColor";
    console.log(this.state.classTwo);
    this.classTwoVal(winner[1]);
    
    }else{
      status =  "Next player: " +  this.state.xIsNext ? "X" : "O";
    }
    
    return (
      <div className="game">
        <div className="game-board">
        <Board squares={current.squares}
            onClick={(i) => {this.handleClick(i)}}  /*theClass={(i) => {this.classTwoVal(i)}}*/ ClassColorName = {this.state.color}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const indexes = squares[a].concat(winnerColor(a),winnerColor(b),winnerColor(c));
      return indexes;
    }
  }
  return null;
}
function winnerColor(a) {
  return a
}
function myfunction(value, index, array){
  value =  value+"1";
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals