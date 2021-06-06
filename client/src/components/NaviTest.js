import React, { useState } from 'react';

const box = {
    width : '100%',
    height : '80vh',
    
}

const img = {
    maxWidth : '100%',    
    maxHeight : '80vh',
    float : 'left',
    color : '#888888',
    overflow : 'hidden',
    height : '100%',
    marginLeft:'30px',
    marginTop:'10px'
    

}
const title = {
    width:'90%',
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

const box_ListTest={
    width:'100%',
    height : '580px',
    textAlign:'center',
    
}

const img_ListTest = {
    maxWidth : '100%',    
    maxHeight : '80vh',
    
    color : '#888888',
    overflow : 'hidden',
    height : '100%',
    
    

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

export class ListTest extends React.Component{
    render(){
        return(
            <div style={box_ListTest}>                  
                   <img style={img_ListTest} src={this.props.p_class_img} alt="profile"/>
                </div>
        )
    }
}


export default NaviTest;