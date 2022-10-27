import React from "react"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function LandingPage(props) {
  const [picks, setPicks] = useState([])
  const [zIndex, setZIndex] = useState([5,4,3,2,1])
  const setCurrentObj = props.setCurrentObj
  const navigate = useNavigate();

  const showObjDetails = obj => {
    setCurrentObj(obj)
    navigate('/object', {replace: true})
  }

  const keys = [435900, 436532, 436534, 435940, 469959]

  useEffect(() => {
    setPicks([])
    keys.forEach((k, i) => {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${k}`)
        .then(res => res.json())
        .then(obj => {
          setPicks(arr => [...arr, obj])
        })
    })
  }, [])

  const onMouseEnter = i => {
    var index = []
    for (var j = 0; j < 5; j++) {
      if (j < i) {
        index.push(j - i + 5)
      } else if (j > i) {
        index.push(i - j + 5)
      } else {
        index.push(i + 5)
      }
    }
    
    setZIndex(index)
  }
  
  const renderImage = (p, i) => {
    return (
      <div className="zoom-lg" key={p.objectID} style={{ zIndex: zIndex[i], transform: `scale(${(1 + zIndex[i]/10)*0.8})` }}>
        <a onClick={() => showObjDetails(p)}>
          <img src={p.primaryImageSmall} className="card-img" alt="..." onMouseOver={ () => onMouseEnter(i) }/>
        </a>
      </div>
    )
  }

  return (
    <div className="landingPage">
      {picks.map((p, i) => {
        return renderImage(p, i)
      })}
    </div>
  )
}

export default LandingPage