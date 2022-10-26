import {useState,useEffect} from 'react'

function ObjectGrid(props) {
  const [objsInfo, setObjsInfo] = useState([])

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
    getResults(props.objIds)
  }, [props.objIds])

  return (
    <div className='cardGrid'>
      {objsInfo.map(o => {
        return (
          <div className="card" key={o.objectID}>
            <div className="imageContainer">
              <img src={o.primaryImageSmall} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <button onClick={() => console.log('hello')}>{o.title}</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ObjectGrid