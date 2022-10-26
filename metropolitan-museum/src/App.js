import './App.css';
import Navigator from './components/Navigator';
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import RenderContent from "./components/RenderContent"
import Deparments from "./components/Departments"
import ObjectGrid from "./components/ObjectGrid"
import ObjectPage from "./components/ObjectPage"

function App() {
  const [objIds, setObjIds] = useState([])
  const [currentObj, setCurrentObj] = useState({})

  return (
    <div className="App">
      <Navigator />
      <Routes>
        <Route path='/' element={<RenderContent />} />
        <Route path='/department' element={<Deparments setObjIds={setObjIds} />} />
        <Route path='/objects' element={<ObjectGrid objIds={objIds} setCurrentObj={setCurrentObj} />} />
        <Route path='/object' element={<ObjectPage currentObj={currentObj} />} />
      </Routes>
    </div>
  )
}

export default App;
