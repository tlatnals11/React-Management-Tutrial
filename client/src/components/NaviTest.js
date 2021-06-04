import React, { useState } from 'react';

const box = {
    width : '100%',
    height : '80vh',
    
}

const img = {
    maxWidth : '100%',    
    maxHeight : '80vh',
    float : 'center',
    color : '#888888',
    overflow : 'hidden',
    height : '100%',
    width: 'auto',
    marginLeft:'20px',
    marginTop:'10px 5px'
    

}
const title = {
    width:'88%',
    height:'40px',
    textAlign:'center',
    fontSize:'1.1em',
    backgroundColor:'#C5E0B4',
    color:'#663E11',
    fontWeight:'bold',
    lineHeight:'40px',
    borderRadius:'10px',
    marginLeft:'20px',


}
class NaviTest extends React.Component {
    render(){
        
        //console.log(this.props.p_name);
        return(
               <div style={box}>
                   <div style={title}>{this.props.p_name}</div>
                   <img src={this.props.p_class_img} alt="profile" style={img}/>
                </div>
        )    
    }
}


export default NaviTest;