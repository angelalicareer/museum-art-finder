import { useNavigate } from 'react-router-dom'

function Navigator(props) {
  const navigate = useNavigate();

  if (!props.showNav) {
    return ""
  }

  return (
    <div id="nav-control">
      <h1>I want to explore...</h1>
      <div>
        <button type="button" onClick={ () => navigate('/pick', {replace: true}) } className="btn btn-light btn-lg">Random Pick</button>
        <button type="button" onClick={ () => navigate('/department', {replace: true}) } className="btn btn-light btn-lg">Departments</button>
      </div>
    </div>
  )
}

export default Navigator