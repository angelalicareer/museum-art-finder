import { useNavigate } from 'react-router-dom'

function Navigator() {
  const navigate = useNavigate();

  return (
    <div id="nav-control">
      <h1>I want to explore...</h1>
      <div>
        <button type="button" onClick={ () => navigate('/', {replace: true}) } className="btn btn-primary btn-lg">Random Pick</button>
        <button type="button" onClick={ () => navigate('/department', {replace: true}) } className="btn btn-primary btn-lg">Departments</button>
      </div>
    </div>
  )
}

export default Navigator