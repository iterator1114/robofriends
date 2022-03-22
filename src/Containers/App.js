import React,{useState, useEffect} from "react";
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css';
import ErrorBoundary from "../Components/ErrorBoundary";

// class App extends Component{
  function App() {
  // constructor(){
  //   super()
  //   this.state={
  //     robots: [],
  //     searchfield: ''
  //   }
  // }

  const [robots,setRobots] = useState([])
  const [searchfield,setSearchfield] = useState("")

  // componentDidMount(){
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response=>response.json())
  //   .then(users=>{this.setState({robots:users})})
  // }

  useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=>response.json())
      .then(users=>{setRobots(users)});
  },[])

  const onSearchChange=(e)=>{
    setSearchfield(e.target.value)
  }

  const filteredRobots = robots.filter(robots =>{
    return robots.name.toLowerCase().includes(searchfield.toLowerCase());
  })

  return !robots.length ?
    <h1>loading...</h1>:
    (
      <div className="tc">
          <h1 className='f1'>Robofriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <ErrorBoundary>
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </ErrorBoundary>
      </div>
    )
}

export default App;