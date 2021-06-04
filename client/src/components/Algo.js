import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//import MainDelete from './MainDelete';
import { ImageAspectRatioSharp } from '@material-ui/icons';
//import Productimg from './components/Productimg';
import {Link}from 'react-router-dom';

const box = {
    width : '70px',
    height : '110px',
    float : 'left',
    
    margin : '10px'
    
}

const img = {
    width: '70px',
    height: '70px',
    float : 'left',
    margin : '0px 10px'
    
  }


const minbox = {
    width : 'auto',
    height : 'auto',
    float : 'center',
    margin : 5
    
}

const name = {
    width : '100%',
    
    margin : '5px',
    color : '#666666',
    fontSize : '5px'
}

const algorithm = {
    width : '50px',
    height : '10px',
    margin : 0,
    fontSize : '10px',
    color : '#888888',
    fontWeight: 'bold'
}






class Algo extends React.Component {
    
    render() {
        return(
            < Link to ="/algo" > 
            <div  onClick = {() => {console.log("추천알고리즘 클릭")}}>
                <div style={algorithm} >추천 알고리즘 </div>
            </div>
            </Link>
        )
    }
}
    

export default Algo;