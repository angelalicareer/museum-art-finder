import { useState } from 'react'

function Deparments(props) {
  const [departments, setDepartments] = useState([])

  const getQuery = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const changeContentFunc = props.changeContent
  const showObjectGrid = async departmentId => {
    let res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&hasImages=true&isHighlight=true&q=${getQuery()}`)
      .then(res => res.json()).then(res => res.objectIDs)
    changeContentFunc('grid', res)
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

  if (departments.length === 0) {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
    .then(res => res.json())
    .then(res => {
      setDepartments(res.departments)
    })
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
