import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

   
class BarcodeProc extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = ({
            open: false
        });
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    barcodeInput(id){
        var code = prompt("바코드를 스캔해주세요."+"");

        const url = '/api/customers/' + code;
        fetch(url, {
            method: 'DELETE',
            method : 'PUT'
        });
        this.props.stateRefresh();
    }

    render() {
        return(
            <div>        
            <Button variant="outlined" color="primary" onClick={(e) => {this.barcodeInput(this.props.id)}}>스캔하기</Button>
           
            </div>
        )
        
    }

}
export default BarcodeProc;