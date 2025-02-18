import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./layout/Body";
import Login from './components/Login';
import store from './utils/store';
import { Provider } from 'react-redux';
import Feed from './components/Feed';
import Profile from "./components/Profile";
import Connections from './components/Connections';
import RequestsReceived from './components/RequestsReceived';
function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests/received" element={<RequestsReceived />} />
              <Route path="/profile" element={<Profile/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
