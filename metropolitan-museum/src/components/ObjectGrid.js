import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcLikePlaceholder } from "react-icons/fc";

function ObjectGrid(props) {
  const [objsInfo, setObjsInfo] = useState([])
  const setCurrentObj = props.setCurrentObj
  const user = props.user
  const navigate = useNavigate();

  const getResults = objs => {
    for (var i = 0; i < objs.length; i++) {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objs[i]}`)
        .then(res => res.json()).then(res => {
          if (res.objectID != null && res.primaryImageSmall !== "") {
            setObjsInfo(arr => [...arr, res])
          }
        })
    }
  }
  
  useEffect(() => {
    setObjsInfo([])
    getResults(props.objIds)
  }, [props.objIds])

  const showObjDetails = obj => {
    setCurrentObj(obj)
    navigate('/object', {replace: true})
  }

  const addFavorite = objId => {
    fetch('http://localhost:3001/favorites/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userId: user.id, objId: objId})
    })
  }

  const showFavBtn = objId => {
    if (user.id) {
      return (
          <button className='btn btn-light' onClick={() => addFavorite(objId)}><FcLikePlaceholder /></button>
      )
    } else {
      return ""
    }
  }

  return (
    <div className='cardGrid'>
      {objsInfo.map(o => {
        return (
          <div className="card" key={o.objectID}>
            <div className="imageContainer">
              <img src={o.primaryImageSmall} className="card-img-top" alt="..." />
            </div>
            <div className="card-body d-flex justify-content-between">
              <button onClick={() => showObjDetails(o) } title={ o.title }>{o.title.length > 24 ? o.title.slice(0, 24) + "..." : o.title}</button>
              {showFavBtn(o.objectID)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ObjectGrid