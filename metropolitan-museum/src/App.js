import './App.css';
import Navigator from './components/Navigator';
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';

import Header from "./components/Header"
import LandingPage from "./components/LandingPage"
import RenderContent from "./components/RenderContent"
import Deparments from "./components/Departments"
import ObjectGrid from "./components/ObjectGrid"
import ObjectPage from "./components/ObjectPage"

function App() {
  const [objIds, setObjIds] = useState([])
  const [currentObj, setCurrentObj] = useState({})
  const [user, setUser] = useState({})
  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')) || {})
  },[])

  return (
    <div className="App">
      <Header user={user} setUser={setUser} setShowNav={ setShowNav } setObjIds={setObjIds}/>
      <Navigator showNav={ showNav } />
      <Routes>
        <Route path='/' element={<LandingPage setCurrentObj={setCurrentObj}/>} />
        <Route path='/pick' element={<RenderContent setCurrentObj={setCurrentObj}/>} />
        <Route path='/department' element={<Deparments setObjIds={setObjIds} />} />
        <Route path='/objects' element={<ObjectGrid objIds={objIds} setCurrentObj={setCurrentObj} user={user} />}/>
        <Route path='/object' element={<ObjectPage currentObj={currentObj} />} />
      </Routes>
    </div>
  )
}

export default App;
