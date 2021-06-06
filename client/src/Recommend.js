import { Component } from 'react';
import Main from './components/Main';
import Detail from './components/Detail';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { CenterFocusStrong } from '@material-ui/icons';

import MapRoundedIcon from '@material-ui/icons/MapRounded';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

import Basket from './Basket';
import WishList from './WishList';
import Navi from './components/Navi';

import List from './components/List';
import ListApp from './ListApp';
import ListAppN from './ListAppN';
import App from './App';
import LoginApp from './LoginApp';
import Register from './components/Register';

import RecommendList from './components/RecommendList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from 'react-router-dom';


const styles = theme => ({
  root : {
    width : '100%',
    minWidth: 375,
  },
  menu : {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  progress : {
    margin: theme.spacing.unit * 2
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  propgress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  inputRoot: {
    color: 'inherit',
    
    
    
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(0.5em + ${theme.spacing(5)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  positioning : {
    width : '100%',
    height : '170px',

  },

  icons : {
    position:'fixed',
     border:"1px solid #ddd",
     backgroundColor:"#3F51B5",
     borderRadius:"30px",
     padding:10,
    fontSize:40,
  
  }
});

class Recommend extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers:'',
      completed:0,
      searchKeyword: '',
      name:'',
      img:'',
      price:'',
      id : '',
      number : ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers:'',
      completed: 0,
      searchKeyword: ''
    });

    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
   
  }


  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
 
  }

  callApi = async () => {
    const response = await fetch('/api/customers/recommend');
  
    const body = await response.json();
  
    return body;
    
  }


  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.p_name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return  <Main stateRefresh={this.stateRefresh} key={c.p_name} p_name={c.p_name}  image={c.image} price={c.price}/>
      });
    }
    const { classes } = this.props;

    

    const title_main = {
      width : '110px',
      margin : 'auto',
      padding :'15px 20px',
      fontSize : '20px',
      float : 'center',
      textAlign : 'center',
      fontWeight: 'bold',
      color: ' white'
      
  }


    const search = {
      width : 'auto',
      float : 'center',
      margin : '10px',
      padding :'auto'
      
  }


  const login_basket_box = {
    width : '375px',
    height: '20px',
    float : 'center',
    
    
  }

  const login = {
    width : '50px',
    margin : 'auto',
    padding :'0px 20px',
    fontSize : '13px',
    float : 'left',
    fontWeight: 'bold',
    color: ' white',
    position : 'left',
    textAlign : 'center'

  }

  const Checklist = {
    width : '50px',
    margin : 'auto',
    padding :'0px 20px',
    fontSize : '13px',
    float : 'right',
    fontWeight: 'bold',
    color: ' white',
    position : 'right',
    textAlign : 'center'
    
  }
  const map = {
    color: ' white',
    marginLeft:'325',
    marginTop:'350'
  }
  


    const cellList1 = ["당신을 위한 추천상품이에요."]
    return( 
      
      <div className={classes.root}>
        <Router>
        <Route exact path ="/" >
        
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              
                {cellList1.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}

               
                 </TableHead>
                 <TableBody>
              {this.state.customers ?
               filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="4" rowSpan="3" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>            
         </Paper>
        </Route>


        

        <Route exact path="/ListApp">
          <ListApp/>
          </Route>
        
        <Route exact path="/ListAppN">
          <ListAppN/>
          </Route>

      

          </Router>
    </div>
   
  

    );
  }
}
export default withStyles(styles)(Recommend);