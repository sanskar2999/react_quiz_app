import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import firebase from '../firebase'
import { withRouter , Redirect } from 'react-router-dom'
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

export default class Final extends React.Component{
	constructor(props) {
		  super(props)
		this.state = {
            score:0,
            logout: 0,
        }
    };
     getscore =()=>{
        const name =firebase.getemail();
        // console.log(name);
        const db = app.firestore();
        var docRef = db.collection("score").doc(name);
            var self = this;
            docRef.get().then(function(doc) {  
                if (doc.exists) {
                    // console.log("Document data:", doc.data()["marks"]);
                    self.setState({score: doc.data()["marks"]});
                    // console.log("Document data:", doc.data["marks"]);

                } else {
                    // doc.data() will be undefined in this case
                    self.setState({score: 0});
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);

            });
         }
    
         logout =() => {
		// await firebase.logout()
		this.setState({ logout:1});
	}
    render(){
	if(!firebase.getCurrentUsername()) {
		// not logged in
        alert('Please login first')
        return <Redirect to='/login'/>
            } 
            if(this.state.logout ===1){
                return <Redirect to="/" />
            }
         
	return (
        <div className="container-fluid">
		<div className="row">
			<div className="jumbotron col-10 offset-1">
                {this.getscore()}
            <Typography component="h1" variant="h5">
		 			Thanks for taking part in Quiz { firebase.getCurrentUsername() }
				</Typography>
                 <Typography component="h1" variant="h5">
			    	You have scored: {this.state.score}
				</Typography>
				<Button
		 			type="submit"
					variant="contained"
					color="secondary"
					onClick={this.logout}
				  >
					Logout
          		</Button>
            </div>
            </div>
            </div>
    )
    }
}
