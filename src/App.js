import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css';

import SearchBar from './components/SearchBar'
import ResultsPanel from './components/ResultsPanel'
import ShowsPanel from './components/ShowsPanel'


export default function App() {
  return (
    <Router>
      <section className='app-container'>
        <SearchBar />
        <Switch>
          <Route path="/search/:searchValue">
            <ResultsPanel />
          </Route>
          <Route path="/shows/:id">
            <ShowsPanel />
          </Route>
        </Switch>
      </section>
    </Router>
  )
}