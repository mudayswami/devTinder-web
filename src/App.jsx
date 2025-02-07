import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./layout/Body";
import Login from './components/Login';
import store from './utils/store';
import { Provider } from 'react-redux';

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<div>Proile Page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
