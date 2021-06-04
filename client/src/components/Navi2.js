import { Component } from 'react';
import App from '../App';
import Basket from '../Basket';
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
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import NaviTest from './NaviTest';
import ListAppN from '../ListAppN'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { SignalCellularNullOutlined } from '@material-ui/icons';

const  addbar = {
  position:"absolute",
  width : '100%',
  bottom : '0px',
  height : '50px',
  margin : '0px auto ',
  fontWeight : 'bold',
  fontAlign : 'center',
  fontSize : '20px',
  align : 'center',
  
}



const styles = theme => ({
  map : {
    width : '100%',
    height : '675px',
    overflow : 'hidden'
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
    color : '#1d1d1d'
},
shopping : {
  width : '30px',
  height : '30px',
  float : 'right',
  margin : '15px'
},
list : {
  width : '35px',
  height : '35px',
  float : 'right',
  margin : '10px 15px',
  color : '#1d1d1d'
  },
  mapbox : {
    width : '100%',
    height : '600px'
  }


});

const area=[[
  [0,3,4], //전체 구역
  [3,0,5],
  [4,5,0]   
],[
 [0,1,2,3], //제 1구역
 [1,0,1,2],
 [2,1,0,1],
 [3,2,1,0]
],
[
 [0,1,2,3,4], //제 2구역
[1,0,1,2,3],
[2,1,0,1,2],
[3,2,1,0,1],
[4,3,2,1,0]
],
[
 [0,2,1,2], //제3구역
[2,0,1,2],
[1,1,0,1],
[2,2,1,0]
]
]; //지역별 경로 할당
/*
area[0] => 구역 경로
area[1] => 1구역
'''
*/
class Navi extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers:'',
      completed:0,
      searchKeyword: '',
      count : 1,
      option : null,
    }
  }

  /*부속 함수들*/

  //no1 (최적 경로)  
  no1 = (data_array1, spot)=>{ //현재 위치 외 구역에서 가장 가까운 구역이고 가장 최적인 물품 출력
    
    
    let best_length=1000000; //가장 가까운 물품
    let best_item;
    let arrLength;
   if(data_array1.length<2) arrLength = data_array1.length;
   else arrLength=2;
    for(let i=0; i<arrLength; i++){// 나중에 2개 이하일 시 발생하는 에러 잡기
      
      if(area[0][parseInt(data_array1[i].area)-1][parseInt(spot[0])-1]<best_length){
        best_length = area[0][parseInt(data_array1[i].area)-1][parseInt(spot[0])-1];
        best_item = data_array1[i];
      }
    }

    return best_item;
  }
  
  /*최단경로*/
  /*
  shortestPath =async (data)=>{

    var spot = [1,1]; //현재 위치 : 초기 설정 1구역 출입구
    

    //데이터 배열에 집어넣음
    var data_array = [];
    data = Object.values(data).filter((c) => {
      return c.p_name.indexOf(this.state.searchKeyword) > -1;
    });
    data.map((c) => {
      data_array.push(c);
    });

    
    //console.log(data_array[0]); //데이터 배열 확인

    //상위 물품 3개 중 현재 구역에 있는 물품이 있는지 확인
    
    let isItem = false;
    let isItem_contents;
    for(let i=0;i<3;i++){ // 나중에 2개 이하일 시 발생하는 에러 잡기
        if(parseInt(data_array[i].area) == parseInt(spot[0])){ //만약 spot[0](현재 구역)에 있는 물품이 있다면
          isItem = true;
          isItem_contents = data_array[i];
          break;
        }
        isItem=false;
    }
    
    if(isItem){
      //console.log(isItem_contents);
    }
    else{
      //console.log("없음");
      //내 구역 내에 물품이 없다면 제일 가까운 곳부터 찾음 or 1위에 있는 물품부터

      //방법1) 가까운 구역의 물품
      //isItem_contents = this.no1(data_array, spot);

      //방법2) 1위 물품

      
    }


  }*/

    
  /*해당 구역 안 물품 리스트 작성*/
  inContents = (arr,spot)=>{
    /*해당 구역 물품 모음*/  
    let isItem_area_contents = [];
    for(let a=0; a<arr.length;a++){
      if(parseInt(spot[0])==parseInt(arr[a].area)){
        isItem_area_contents.push(arr[a]);
      }
    }
    //console.log(isItem_area_contents);
    //현재 위치에 물품들이 있다면
    let best_1;
    if(isItem_area_contents.lenth!=0){
      //우선 순위 높은 것을 담기
      let best_1_prio=-1;    
      let prio;
      for(let a=0;a<isItem_area_contents.length;a++){
        prio = parseInt(isItem_area_contents[a].fresh)+parseInt(isItem_area_contents[a].soft);
        
        if(best_1_prio<prio){
          
          best_1_prio = prio;
          best_1 = isItem_area_contents[a];
        }
      }
      //console.log(best_1);
      return(best_1);
      
    }
    else{ //현재 위치에 물품이 없음 => null 출력
      return(null);
    }
  }
   
  /*알고리즘*/
  
  priority = (data)=>{ 
    var INF = 10000000;

    var area=[[
      [0,3,4], //전체 구역
      [3,0,5],
      [4,5,0]   
    ],[
     [0,1,2,3], //제 1구역
     [1,0,1,2],
     [2,1,0,1],
     [3,2,1,0]
   ],
   [
     [0,1,2,3,4], //제 2구역
    [1,0,1,2,3],
    [2,1,0,1,2],
   [3,2,1,0,1],
   [4,3,2,1,0]
   ],
   [
     [0,2,1,2], //제3구역
    [2,0,1,2],
    [1,1,0,1],
    [2,2,1,0]
   ]
   ]; //전체 영역에 대한 경로
 
   var spot = [1,1]; //현재 위치 : 초기 설정 1구역 출입구
   var arr = [];
   var areaCount = [0,0,0];
   var bestList = [];
   var soft = false;

   data = Object.values(data).filter((c) => {
     return c.p_name.indexOf(this.state.searchKeyword) > -1;
   });
   data.map((c) => {
     arr.push(c);
   });   

   if(arr.length==0) return <NaviTest stateRefresh={this.stateRefresh} p_name="x" p_class_img="https://i.postimg.cc/MTtVfy7c/image.png"/>  //리스트에 아무것도 없을 때 출력하는 이미지

   let isItem = false; 
   let isItem_contents; 
   let arrLength;
   if(arr.length<2) arrLength = arr.length;
   else arrLength=2;

   
   for(let i=0;i<arrLength;i++){ 
    
      if(parseInt(arr[i].area) == parseInt(spot[0])){ //만약 spot[0](현재 구역)에 있는 물품이 있다면
            isItem = true;
            isItem_contents = arr[i];
            break;
          }
          isItem=false;
   }


  if(isItem){
    return <NaviTest stateRefresh={this.stateRefresh} p_name={isItem_contents.p_name} p_class_img={isItem_contents.p_class_img}/>
  }
  else{
    if(parseInt(this.state.option)){ //최단 경로
      
      let best_1 = this.inContents(arr,spot); //현재 구역 내에 있는 최적 물품 위치 

      if(best_1==null){ //현재 구역에 물품이 없으면(최적 경로와 동일)
         
        isItem_contents = this.no1(arr, spot);
        spot[0] = isItem_contents.area;
        spot[1] = isItem_contents.area_area;
        return <NaviTest stateRefresh={this.stateRefresh} p_name={isItem_contents.p_name} p_class_img={isItem_contents.p_class_img}/>
      }
      else{ //현재 구역에 물품이 있으면        
        try {     
          return <NaviTest stateRefresh={this.stateRefresh} p_name={best_1.p_name} p_class_img={best_1.p_class_img}/>
        } catch (error) {          
          return <NaviTest stateRefresh={this.stateRefresh} p_name="x" p_class_img="https://i.postimg.cc/MTtVfy7c/image.png"/>          
        }
      }

    }
    else{ // 가까운 구역의 물품 찾기 (최적 경로)
     
      isItem_contents = this.no1(arr, spot);
      spot[0] = isItem_contents.area;
      spot[1] = isItem_contents.area_area;
      return <NaviTest stateRefresh={this.stateRefresh} p_name={isItem_contents.p_name} p_class_img={isItem_contents.p_class_img}/>
    }

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

  radioChange = (e) => {
    
    this.setState({
      option: e.target.value
    })
    
    

  }

  render() {
    //this.shortestPath(this.state.customers);
    const filteredComponents = (data) => {

      data = data.filter((c) => {
        return c.p_name.indexOf(this.state.searchKeyword) > -1;
      });
      //console.log(data);
      return data.map((c) => {
        return <NaviTest stateRefresh={this.stateRefresh} p_name={c.p_name} p_class_img={c.p_class_img}/>
      }); 
    }
    
    const { classes } = this.props;
    return(
     
      <div>
        <Router>
        <Route exact path="/Navi">
        
        
        <div className={classes.bar}>
        <Link to="/"><ArrowBackIosRoundedIcon className={classes.back}/></Link>
        <div>
        <input type="radio" name="radio" id="radio1" value="1" onChange={(e) => this.radioChange(e)} /> 최단 우선
        <input type="radio" name="radio" id="radio2" value="0" onChange={(e) => this.radioChange(e)} /> 최적 우선
      </div>
        <Link to="/ListAppN"><ListRoundedIcon className={classes.list}></ListRoundedIcon></Link>
        </div>

        <div className={classes.map}>
          <Table className={classes.table}>
            <TableBody>
           
              {this.state.customers ?
               this.priority(this.state.customers) :
              <TableRow>
                
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
                
              </TableRow>
              } 
            </TableBody> 
            </Table>
            </div>  
            </Route>
          
          <Route path="/" exact>   
          <App/>
          </Route> 
          <Route path="/ListAppN" exact>   
          <ListAppN/>
          
          </Route> 
          
          </Router>
          
          </div>
    );
  }
}

export default withStyles(styles)(Navi);