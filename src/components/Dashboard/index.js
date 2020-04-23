import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import firebase from '../firebase'
import { withRouter, Redirect} from 'react-router-dom'
import './App.css';
import './bootstrap.min.css';
import 'firebase/firestore';
import app from 'firebase/app';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

export default class Dashboard extends React.Component{
	constructor(props) {
		 super(props)
		this.state = {
		  value: 0,
		  logout: 0,
		  score: 0,
		  check:0,
		  finalpage: 0,
		  text: "Continue",
		  selected_option: null,
		  answer: [],
		  email: firebase.getemail(),
		  ques: [
			{
			  question:"what is Recat used for ?",
			  option:['useful','stateless','stateful','both'],
			},
			{
				question:"PM of india ?",
				option:['useful','stateless','MODI','both'],
			  },
			  {
				question:"CM of karnataka ?",
				option:['useful','Nadiu','stateful','both'],
			  },
			  {
				question:"Capital of india ?",
				option:['Delhi','stateless','stateful','both'],
			  },
			  {
				question:"what is Recat used for ?",
				option:['useful','stateless','stateful','both'],
			  }
		  ]	
		}
		this.getanswer();
	  };


	getques = () => {
		console.log("inside getques");
		this.setState({selected_option: null});
		this.setState({value: this.state.value+1});
		if(this.state.check == 1)
		{
		this.setState({score: this.state.score+1});
		this.setState({check: 0});
		}
		if(this.state.value == 3)
		{
		this.setState({text: "submit"});
		}
		// console.log(this.state.value);
	};
	submitquiz =() =>{
		// console.log(this.state.score);
		this.pushdata();
		this.setState({ finalpage:1});
	}
	logout = () =>{
		this.pushdata();
	//   await firebase.logout();
	 this.setState({ logout:1});
	};
	 
	pushdata = () => {
		const db = app.firestore();
		const email1=this.state.email;
		if(this.state.check==1)
		{
		db.collection("score").doc(email1).set({
			marks: this.state.score+1
		}) 
	  }
	  else{
		db.collection("score").doc(email1).set({
			marks: this.state.score
		}) 
	  }
	}
	 getanswer(){
		const db = app.firestore();
        var docRef = db.collection("answer").doc("correct_answer");
             var self = this;
            docRef.get().then(function(doc) {  
                if (doc.exists) {
                  	  // console.log("Document data:", doc.data()["answer"]);
                      self.setState({answer: doc.data()["answer"]});
                    // console.log("Document data:", doc.data["marks"]);

                } else {
                    // doc.data() will be undefined in this case
                    // self.setState({score: 0});
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);

            });
	 }

	Answer = selected => {
		this.setState({selected_option: selected});
	if(selected==this.state.answer[this.state.value])
	{ 
	   this.setState({check: 1});	
	}
	else
	{
		this.setState({check: 0});	
	}

	};

	  
	  render(){
		if(!firebase.getCurrentUsername()) {	
			// not logged in
			alert('Please login first')
			return <Redirect to='/login'/>
		}

		if(this.state.logout ===1){
			return <Redirect to="/" />
		}
		if(this.state.finalpage ===1){
			return <Redirect to="/final" />
		}
	return (
	
	<div className="container-fluid">
		<div className="row">
			<div className="jumbotron col-10 offset-1">
			<h1>Quiz</h1>
			<p>A New Game</p>		
		 <Typography component="h1" variant="h5">
					Hello { firebase.getCurrentUsername() }
			</Typography>
		       <Button
					type="submit"
					variant="contained"
					color="secondary"
					onClick={this.logout}>
					Logout
          		</Button>
				  <br></br>
	<h3>Score: {this.state.score}</h3>
				  </div>
				  </div>
      			<div className="row turn" style={{backgroundColor:'white'}}>
			 <div className="col-4 offset-1">
			  <p>Q{this.state.value+1}. {this.state.ques[this.state.value]['question']}</p>
			 </div>
			 <div className="col-6">
			   {this.state.ques[this.state.value]['option'].map((item, key) => 	 this.state.selected_option == key ? <div key={key} className="answer-selected"  onClick={()=>{this.Answer(key)}}>
			<h4>{item}</h4>
		  </div> : <div key={key} className="answer"  onClick={()=>{this.Answer(key)}}>
			<h4>{item}</h4>
		  </div> )}
			 </div>
		  </div>
	  
				  <div className="offset-8">
				  <Button
					type="submit"
					variant="contained"
					color="primary"
					onClick= { ()=>{if(this.state.text=="submit"){
						console.log("submit");
						 this.submitquiz()
					}
					else{
						console.log("getques");
						// this.getanswer()
						this.getques()
					}
					}}>
					 {this.state.text} 
          		</Button>
				  </div>
      			<div id="footer" className="row">
			<div className="col-12">
			  <p className="text-muted credit">
				All quiz is &copy; <strong>Sanskar</strong>
				</p>
			</div>
		  </div>
    		</div>
	)
}
}

