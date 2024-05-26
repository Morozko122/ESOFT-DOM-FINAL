import { useState } from 'react'
import './App.css'
import MainPage from './components/Pages/mainpage'
import { Router } from './router'
import { Provider } from 'react-redux'
import store from './components/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <Router/>
      </Provider>
      {/* <Router></Router> */}

    </>
  )
}

export default App
