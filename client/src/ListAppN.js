import { Component } from 'react';
import List from './components/List';
import App from './App';
import Basket from './Basket';
import Navi from './components/Navi';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import {ListTest} from './components/NaviTest';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';



const styles = theme => ({
  root : {
    width : '100%'
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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

  bar : {
    width : '100%',
    height : '60px',
    backgroundColor : '#3F51B5'

  },

  userbox : {
    width : '100%',
    height : '90px',
  },

  userimg : {
    width : '65px',
    height : '65px',
    margin : '20px 10px 10px',
    float : 'left',
    borderRadius : '50%',
    color : '#666666',
    backgroundImage : 'url(https://i.postimg.cc/7h000xvw/user.png)',
    backgroundRepeat: 'no-repeat'
  },

  userinfo : {
    width : '150px',
    height : '70px',
    margin : '20px 10px 10px',
    float : 'left'
  },
  
  username : {
    width : '100%',
    height : '20px',
    float : 'left',
    margin : '5px 0px',
    color : '#666666',
    fontWeight : 'bold'
  },

  userid : {
    width : '100%',
    height : '20px',
    float : 'left',
    margin : 0,
    color : '#666666'
  },

  more : {
    width : '100%',
    height : '100%',
    margin : '5px 0px',
    fontWeight : 'bold'
  },
  width : {
    width : '70%'
  },
  back : {
    width : '30px',
    height : '30px',
    float : 'left',
    margin : '15px',
    color:"white"
},
shopping : {
  width : '30px',
  height : '30px',
  float : 'right',
  margin : '15px',
  color:"white"
},
list : {
  width : '200px',
  height : '30px',
  float : 'left',
  margin : '15px 10px 15px 40px',
  color : 'white',
  textAlign : 'center',
  fontSize : '20px'
}


});



class ListAppN extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers:'',
      completed:0,
      searchKeyword: '',
      count : 1
    }
  }
  spaceImg=(e)=>{
    let len = e.length;
    if(len==0)  return <ListTest stateRefresh={this.stateRefresh} p_name="x" p_class_img="https://i.postimg.cc/MTtVfy7c/image.png"/>  //리스트에 아무것도 없을 때 출력하는 이미지  
    else return <div></div>
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
    const response = await fetch('/api/customers/list');
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
        return <List stateRefresh={this.stateRefresh} key={c.barcode} id={c.barcode} image={c.image} p_name={c.p_name} price={c.price} count={c.count}/>
      });
      
     

     
    }
    
    const { classes } = this.props;
    const cellList = [" + 더 담으러 가기"]
    return(
      <div className={classes.root}>
        <Router>
        <Route exact path="/ListAppN">
        <div className={classes.bar}>
        <Link to="/Navi"><ArrowBackIosRoundedIcon className={classes.back}/></Link>
        <div className={classes.list}>리스트</div>
        <Link to="/basket"><ShoppingCartOutlinedIcon className={classes.shopping}/></Link>
        </div>
       
          
        {/* 사용자 프로필 부분
        <div className={classes.userbox}>
          <div className={classes.userimg}/>
          <div className={classes.userinfo}>
            <div className={classes.username}>우아한</div>
            <div className={classes.userid}>elegant00</div>
      
          </div>
        </div>
         */}
        <AppBar position="static">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="원하는 상품명을 검색하세요"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
      </AppBar>
      
      
          <Table className={classes.table}>
            
            <TableBody>
           
              {
               this.state.customers?
               filteredComponents(this.state.customers) :
               <div></div>
              }
              {this.spaceImg(this.state.customers)}
              {cellList.map(c => { 
                  return  <Link to="/"><Button variant="contained" color="primary" className={classes.more} align="center" stateRefresh={this.stateRefresh}>{c}
                  </Button></Link>
              })}
            
            </TableBody> 
            </Table>  
            </Route>
          
          <Route exact path="/" >   
          <App/>
          </Route> 

          <Route exact path="/Navi" >   
          <Navi/>
          </Route>           
          
          <Route exact path="/basket" >   
          <Basket/>
          </Route> 

          </Router>
    </div>

    );
  }
}

export default withStyles(styles)(ListAppN);