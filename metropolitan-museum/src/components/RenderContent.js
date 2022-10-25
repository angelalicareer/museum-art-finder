import React from "react"

class RenderContent extends React.Component {

  state = {
      content : '',
      imageUrl : '',
      listOfDepartments : ['name1', 'name2', 'name3']
  }

  onClick = event => {
    this.setState(this.state.listOfDepartments)
  }
  
  render() {
    return(
      <div className="picks">    
        <a href="">
        <img src="https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=663&height=800&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FvT9-6ow1_5WbpJEMVWoymg%2Fnormalized.jpg" alt="" /></a>
        <a href="">
          <img src="https://cdn.myminifactory.com/assets/object-assets/58e65aa1b6483/images/720X720-untitled.jpg" alt="" />
        </a>
        <a href="">
          <img src="https://d3t7modobimpp4.cloudfront.net/uploads/_1920x784_crop_center-center_none/shutterstock_441157258.jpg" alt="" />
        </a>
      </div>
  )}
}



export default RenderContent