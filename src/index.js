import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz';
import './index.css';
import App from './components/App'

ReactDOM.render(<App />, document.getElementById('root'))
// const ques=[
//   {
//     question:"what is Recat used for ?",
//     option:['useful','stateless','stateful','both'],
//     answer:"both"
//   }
// ];
// const state ={
//      turnData: {
//      question:ques[0].question,
//      option:ques[0].option
//      }
// };
// function Answer(selected){
// if(selected==ques[0].answer)
// {
  
// }
// console.log(selected);
// render();
// } 
// function render() {
// ReactDOM.render(
//   <Quiz {...state} Answer={Answer}/>,
//   document.getElementById('root')
//   );
// }
// render();
