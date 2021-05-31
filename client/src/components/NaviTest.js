import React, { useState } from 'react';

const box = {
    width : '100%',
    height : '675px'
}

const img = {
    width : '100%',
    height : '675px',
    float : 'left',
    color : '#888888',
    overflow : 'hidden',
    height : '100%'
}

class NaviTest extends React.Component {
    render(){
        return(
               <div style={box}>
                   <img src={this.props.p_class_img} alt="profile" style={img}/>
                </div>
        )    
    }
}


export default NaviTest;