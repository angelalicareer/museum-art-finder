import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

function Deparments(props) {
  const [departments, setDepartments] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
    .then(res => res.json())
    .then(res => {
      setDepartments(res.departments)
    })
  })

  const setObjIdsFunc = props.setObjIds
  const showObjectGrid = departmentId => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`)
      .then(res => res.json()).then(res => {
        setObjIdsFunc(res.objectIDs.slice(0, 100))
        navigate('/objects', {replace: true})
      })
  }

  const departImages = {
    'American Decorative Arts': 'https://images.metmuseum.org/CRDImages/ad/original/DP245834.jpg',
    'Ancient Near Eastern Art': 'https://images.metmuseum.org/CRDImages/an/original/DP226593.jpg',
    'Arms and Armor': '',
    'Arts of Africa, Oceania, and the Americas': '',
    'Asian Art': '',
    'The Cloisters': '',
    'The Costume Institute': '',
    'Drawings and Prints': '',
    'Egyptian Art': '',
    'European Paintings': '',
    'European Sculpture and Decorative Arts': '',
    'Greek and Roman Art': '',
    'Islamic Art': '',
    'The Robert Lehman Collection': '',
    'The Libraries': '',
    'Medieval Art': '',
    'Musical Instruments': '',
    'Photographs': '',
    'Modern Art': ''
  }

  return(
    <div className='cardGrid'>
      {departments.map(e => {
        return (
          <div className="card" key={e.departmentId}>
            <div className="imageContainer">
              <img src={departImages[e.displayName]} className="card-img" alt="..." />
            </div>
            <div className="card-body">
              <h5 className="card-title"><button onClick={ () => showObjectGrid(e.departmentId) }>{e.displayName}</button></h5>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Deparments
