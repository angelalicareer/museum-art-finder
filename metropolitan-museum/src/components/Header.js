import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import ScorePassword from '../ScorePassword'

function Header(props) {
  const user = props.user
  const setUser = props.setUser
  const setShowNav = props.setShowNav
  const setObjIdsFunc = props.setObjIds
  const navigate = useNavigate();

  const [strengthOfPassword, setStrenth] = useState('')
  const [showPassword, togSwitch] = useState(true)
  const [toggleType, typeSwitch] = useState('password')

  const handleInputchange = event => {
    const inputValue = event.target.value
    const obj = ScorePassword (inputValue) 
    const scores = obj.score

    if (scores < 3){
      setStrenth('weak')
    }
    else if (scores > 5){
      setStrenth('strong')
    }
    else{
      setStrenth('medium')
    }
  }
  
  

  const toggleSwitch = event => {
    if (showPassword){
      togSwitch(!showPassword)  
      typeSwitch('text')         
    }else{
      togSwitch(!showPassword)  
      typeSwitch('password')      
    }
  }     

  const login = () => {
    const email = document.getElementById('login-email').value
    const pass = document.getElementById('login-pass').value
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email: email, pass: pass})
    }).then(res => res.json()).then(user => {
      setUser(user)
      sessionStorage.setItem('user', JSON.stringify(user))
    })

    document.getElementById('login-email').value = ''
    document.getElementById('login-pass').value = ''
  }

  const signup = () => {
    const name = document.getElementById('signup-name').value
    const email = document.getElementById('signup-email').value
    const pass = document.getElementById('signup-pass').value
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: name, email: email, pass: pass})
    })

    document.getElementById('signup-name').value = ''
    document.getElementById('signup-email').value = ''
    document.getElementById('signup-pass').value = ''
    navigate('/', {replace: true})
  }

  const logout = () => {
    fetch('http://localhost:3001/', {
      method: 'DELETE'
    }).then(res => {
      setUser({})
      sessionStorage.removeItem('user')
      setShowNav(true)
      navigate('/', {replace: true})
    })
  }

  const userFavorites = () => {
    fetch('http://localhost:3001/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userId: user.id})
    }).then(res => res.json()).then(objs => {
      setObjIdsFunc(objs) 
      setShowNav(false)
      navigate('/objects', {replace: true})
    })
  }

  const searchArt = () => {
    const query = document.getElementById('searchBox').value
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`, {
      credentials: "same-origin",
      Cookie: "SameSite=none; Secure"
    })
      .then(res => res.json()).then(objs => {
        setObjIdsFunc(objs.objectIDs.slice(0,100))
        setShowNav(true)
        navigate('/objects', {replace: true})
      })
    
    document.getElementById('searchBox').value = ''
  }
  
  const showUserControl = () => {
    if (user.id) {
      return (
        <div className="userControl">
          <button type="button" className="btn btn-primary" onClick={userFavorites}>
            Favorites
          </button>
          <button type="button" className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      )
    } else {
      return (
        <div className="userControl">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
            login
          </button>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">
            Signup
          </button>
        </div>
      )
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><b>Arts & Culture</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">           
            </ul>
            <div className="d-flex">
              <input className="form-control me-2" type="search" id="searchBox" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" onClick={searchArt}>Search</button>
            </div>
            {showUserControl()}
          </div>
        </div>
      </nav>
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-3"><label htmlFor="email">Email: </label></div>
              <div className="col"><input type="text" id="login-email"/></div>
            </div>
            <div className="row">
              <div className="col-3"><label htmlFor="pass">Password: </label></div>
                <div className="col">
                  <input type="password" id="login-pass"/>
                </div>
            </div> 
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Signup</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div className="modal-body">
               <div className="row">
                <div className="col-3"><label htmlFor="name">Name: </label></div>
                <div className="col"><input type="text" id="signup-name"/></div>
              </div>
              <div className="row">
                <div className="col-3"><label htmlFor="email">Email: </label></div>
                <div className="col"><input type="text" id="signup-email"/></div>
              </div>
              <div className="row">
                <div className="col-3"><label htmlFor="pass">Password: </label></div>
                <div className="col">
                  <input type={toggleType} id="signup-pass" onChange={event => handleInputchange(event)} />
                  <input type="checkbox" className="ToggleSwitch" onClick={event =>toggleSwitch(event)} />
                  <span>Show Password</span>
                  <h6>{strengthOfPassword}</h6>
                </div>
              </div> 
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={signup}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header