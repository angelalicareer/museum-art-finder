import React from "react"

class RenderContent extends React.Component {

  state = {
      content : '',
      imageUrl : ''
  }
  componentDidMount() {
    
              

  }


  render() {
    return(
    <div>     
      <a className='picture' href="">Image one</a>
      <a href="">Image two</a>
      <a href="">Image three</a>
    </div>
  )}

}



export default RenderContent