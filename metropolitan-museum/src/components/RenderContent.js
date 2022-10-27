import React from "react"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function RenderContent(props) {
  const [picks, setPicks] = useState([])
  const setCurrentObj = props.setCurrentObj
  const navigate = useNavigate();

  const showObjDetails = obj => {
    setCurrentObj(obj)
    navigate('/object', {replace: true})
  }

  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
      .then(res => res.json())
      .then(res => {
        var departmentId = res.departments[Math.floor(Math.random() * res.departments.length)].departmentId
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`)
          .then(res => res.json()).then(res => {
            let objs = res.objectIDs.slice(0, 48)
            for (var i = 0; i < objs.length; i++) {
              fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objs[i]}`, {
                credentials: "same-origin",
                Cookie: "SameSite=none; Secure"
              }).then(res => res.json()).then(res => {
                if (res.objectID != null && res.primaryImageSmall !== "") {
                  setPicks(arr => [...arr, res])
                }
              })
            }
        })
      })
  },[])

  return (
    <div className="picks">    
      {picks.slice(0,12).map(p => {
        return (
          <div className="zoom" key={p.objectID}>
            <a onClick={() => showObjDetails(p)}>
              <img src={p.primaryImageSmall} className="card-img" alt="..." />
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default RenderContent