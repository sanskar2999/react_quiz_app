// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import logo from './logo.svg';
//   import './App.css';
// import './bootstrap.min.css';
// function Hero(){
//   return(
//      <div className="row">
//        <div className="jumbotron col-10 offset-1">
//           <h1>Quiz</h1>
//           <p>A New Game</p>
//        </div>
//      </div>
//   );
// }
// function Turn({question,option,Answer}){
//   return(
//     <div className="row turn" style={{backgroundColor:'white'}}>
//        <div className="col-4 offset-1">
//         <p>Q1. {question}</p>
//        </div>
//        <div className="col-6">
//          {option.map((title) => <Book title={title} key={title} onClick={Answer}/> )}
//        </div>
//     </div>

//   );
// }
// Turn.PropTypes ={
// Answer:PropTypes.func.isRequired
// };
// function Book({title,onClick}){
//   return(
//     <div className="answer"  onClick={()=>{onClick(title);}}>
//       <h4>{title}</h4>
//     </div>
//   );
// }
// function Footer(){
//   return(
//     <div id="footer" className="row">
//       <div className="col-12">
//         <p className="text-muted credit">
//           All quiz is &copy; <strong>Sanskar</strong>
//           </p>
//       </div>
//     </div>
//   );
// }

// function Quiz({turnData,Answer}){
//     return (  
//     //  <div onClick={this.props.onClick}>
//     //    This div has been clicked {this.props.clicks} times.
//     //  </div>
//     <div className="container-fluid">
//       <Hero/>
//       <Turn {...turnData} Answer={Answer}/>
//       <Footer />
//     </div>
//     );
// }

// export default Quiz;
