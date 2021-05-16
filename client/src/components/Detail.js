import React from 'react';
import Button from '@material-ui/core/Button';
import ListAdd from './ListAdd';
import Main from './Main'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { BottomNavigation } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Counter from '../counter';

const back = { 
  color: ' white',
  marginTop: 5,
  marginLeft: 10,
}
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    paper: {
      margin: '10px auto',
      width: '100%',
      height : '130px'
    },
    name : {
      width : '100%',
      height : '30px',
      fontSize : '20px',
      margin : '10px 20px 5px',
      color : '#666666'
    },
    price : {
      width : '100px',
      height : '30px',
      fontSize : '20px',
      margin : '0px 20px',
      fontWeight : 'bold',
      color : 'gray'
    },
    title: {
      flexGrow: 1,
    },
    image: {
      margin: '0px auto',
      width: '100%',
      height: '280px',
      textAlign:'center',
      backgroundColor : 'white'
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    table: {
      maxWidth: 414,
    },
    add:{
      position:"fixed",
      marginTop:230,
      
    },
    numberbar : {
      width : '65px',
      height : '20px',
      margin : '5px 0px',
      color : '#666666',
      border : '1px solid',
      borderRadius : '20px'
  
  },
  countbox : {
    width : '100px',
    height : '30px',
    margin : '20px 20px',
  }
 

}));


export default function Detail(props){
    

    const classes = useStyles();
  
    const name = ({props, name})=>{
      console.log(props, name);
    }
    return(      
      
      <div>     

      <AppBar position="static" >
        <Toolbar >
          
          
          <IconButton edge="start" className={classes.menuButton}  color="inherit" aria-label="menu">
          <Link to="/"> <ArrowBackIosRoundedIcon style={back}  /></Link>
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={()=>{
            console.log(props.name);
          }}>
            
          </Typography>
          
        </Toolbar>
      </AppBar>
      
      <div className={classes.image}>
      <img className={classes.img} alt="complex" src={props.img} /> 
      </div>

      <Paper className= {classes.paper}>  
      <div className={classes.name}>{props.name}</div>
      <div className={classes.price}>{props.price} 원</div>
      <div className={classes.countbox}>
        <div className={classes.numberbar}><Counter/></div>
      </div>
      </Paper>
        
    
      <ListAdd stateRefresh={props.stateRefresh} id={props.id}></ListAdd>
      
    </div>
    )
}