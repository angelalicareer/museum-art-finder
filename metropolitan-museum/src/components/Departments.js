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
        setObjIdsFunc(res.objectIDs.slice(0, 50))
        navigate('/objects', {replace: true})
      })
  }

  const departImages = {
    'American Decorative Arts': 'https://images.metmuseum.org/CRDImages/ad/original/DP245834.jpg',
    'Ancient Near Eastern Art': 'https://images.metmuseum.org/CRDImages/an/original/DP226593.jpg',
    'Arms and Armor': 'https://images.metmuseum.org/CRDImages/aa/original/DP336899.jpg',
    'Arts of Africa, Oceania, and the Americas': 'https://images.metmuseum.org/CRDImages/eg/original/DT10872.jpg',
    'Asian Art': 'https://images.metmuseum.org/CRDImages/as/original/DP235628_CRD.jpg',
    'The Cloisters': 'https://images.metmuseum.org/CRDImages/cl/original/cdi32-24-41.jpg',
    'The Costume Institute': 'https://images.metmuseum.org/CRDImages/ci/original/C.I.39.13.43_F.jpg',
    'Drawings and Prints': 'https://images.metmuseum.org/CRDImages/dp/original/DP884777.jpg',
    'Egyptian Art': 'https://images.metmuseum.org/CRDImages/eg/original/DP323404.jpg',
    'European Paintings': 'https://images.metmuseum.org/CRDImages/ep/original/DP162160.jpg',
    'European Sculpture and Decorative Arts': 'https://images.metmuseum.org/CRDImages/es/original/7574.jpg',
    'Greek and Roman Art': 'https://images.metmuseum.org/CRDImages/gr/original/DP121864.jpg',
    'Islamic Art': 'https://images.metmuseum.org/CRDImages/is/original/sf62-152-6r.jpg',
    'The Robert Lehman Collection': 'https://images.metmuseum.org/CRDImages/rl/original/SLP1969-1.jpg',
    'The Libraries': 'https://images.metmuseum.org/CRDImages/li/original/b11679244_002.jpg',
    'Medieval Art': 'https://images.metmuseum.org/CRDImages/md/original/sf41-100-168s4.jpg',
    'Musical Instruments': 'https://images.metmuseum.org/CRDImages/mi/original/D3340%2089.4.804.jpg',
    'Photographs': 'https://images.metmuseum.org/CRDImages/ph/original/DP-16448-031.jpg',
    'Modern Art': 'https://images.metmuseum.org/CRDImages/ma/original/DT6415.jpg'
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
              <button className='customBtn' onClick={ () => showObjectGrid(e.departmentId) }>{e.displayName}</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Deparments
