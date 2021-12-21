import './App.css';
import Navbar from './components/Navbar';
import ListView from './components/ListView';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import CardDetail from './components/CardDetail';

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<ListView/>}/>
        <Route path=':user/:repo/issue/:id' element={<CardDetail/>}/>
      </Routes>
    </div>
  }
}

export default App;
