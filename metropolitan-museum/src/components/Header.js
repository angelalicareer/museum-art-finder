import {useNavigate} from 'react-router-dom';

function Header(props) {
  const user = props.user
  const setUser = props.setUser
  const setShowNav = props.setShowNav
  const navigate = useNavigate();
  const setObjIdsFunc = props.setObjIds

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
  }

  const signup = () => {
    const name = document.getElementById('signup-name').value
    const email = document.getElementById('signup-email').value
    const pass = document.getElementById('signup-pass').value
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: name, email: email, pass: pass})
    }).then(res => res.json()).then(user => {
      setUser(user)
      sessionStorage.setItem('user', JSON.stringify(user))
    })
  }

  const logout = () => {
    fetch('http://localhost:3001/', {
      method: 'DELETE'
    }).then(res => {
      setUser({})
      sessionStorage.removeItem('user')
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
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
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
              <div className="col"><label htmlFor="email">Email: </label></div>
              <div className="col"><input type="text" id="login-email"/></div>
            </div>
            <div className="row">
              <div className="col"><label htmlFor="pass">Password: </label></div>
              <div className="col"><input type="text" id="login-pass"/></div>
            </div> 
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={login}>Login</button>
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
                <div className="col"><label htmlFor="name">Name: </label></div>
                <div className="col"><input type="text" id="signup-name"/></div>
              </div>
              <div className="row">
                <div className="col"><label htmlFor="email">Email: </label></div>
                <div className="col"><input type="text" id="signup-email"/></div>
              </div>
              <div className="row">
                <div className="col"><label htmlFor="pass">Password: </label></div>
                <div className="col"><input type="text" id="signup-pass"/></div>
              </div> 
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={signup}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Header