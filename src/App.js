
import './App.css';
import React, { Component } from 'react'
import Navbar from './Navbar';
import NewsComponent from './NewsComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import About from './About';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageNoItems=9;
  apiKey="f75af67b6dac4a5da3ef245729fa1364"
  // apiKey=process.env.REACT_API_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <Router>
        <div>
        <LoadingBar 
        color='#f11946'
        height={3}
        progress={this.state.progress}
        />
          <Navbar />
          <Routes>
            <Route  path="/"element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key='home' pageSize={this.pageNoItems} country="in" home='home' category="home" />} />
            <Route  path="/general" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageNoItems} country="in" category="general" />} />
            <Route  path="/sports"  element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageNoItems} country="in" category="sports" />} />
            <Route  path="/business" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key='business'  pageSize={this.pageNoItems} country="in" category="business" />} />
            <Route  path="/entertainment" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key='Home' pageSize={this.pageNoItems} country="in" category="entertainment" />} />
            <Route  path="/health"element={<NewsComponent setProgress={this.setProgress}  apiKey={this.apiKey} key='entertainment' pageSize={this.pageNoItems} country="in" category="health" />} />
            <Route  path="/science" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageNoItems} country="in" category="science" />} />
            <Route  path="/technology" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageNoItems} country="in" category="technology" />} />
            {/* <Route  path="/about"element={<About/>} /> */}
          </Routes>
        </div>
      </Router>

    )
  }
}
// export default App;
