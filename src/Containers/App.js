import React,{Component} from "react";
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css';
import ErrorBoundary from "../Components/ErrorBoundary";

class App extends Component{
  constructor(){
    super()
    this.state={
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(users=>{this.setState({robots:users})})
  }

  onSearchChange=(e)=>{
    this.setState({searchfield: e.target.value})
  }


  render() {
    const filteredRobots = this.state.robots.filter(robots =>{
      return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })

    return (
      <div className="tc">
          <h1>Robofriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <ErrorBoundary>
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </ErrorBoundary>
      </div>
    )
  }
}

export default App;