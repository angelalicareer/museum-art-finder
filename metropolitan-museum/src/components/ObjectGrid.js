import React from "react"

class ObjectGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      objIds: props.objs,
      objInfo: []
    }

    this.changeContentFunc = props.changeContent
  }

  componentDidMount() {
    let objIds = this.state.objIds
    let objInfo = [];
    var fetches = [];
    for (var i = 0; i < objIds.length; i++) {
      fetches.push(fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objIds[i]}`).then(res => res.json()).then(res => objInfo.push(res)))
    }

    Promise.all(fetches).then(() => this.setState({
      objInfo: objInfo
    }))
  }

  render() {
    return (
      <div className='cardGrid'>
        {this.state.objInfo.filter(o => o.objectID != null && o.primaryImageSmall !== "").map(o => {
          return (
            <div className="card" key={o.objectID}>
              <div className="imageContainer">
                <img src={o.primaryImageSmall} className="card-img-top" alt="..." />
              </div>
              <div className="card-body">
                <button onClick={() => this.changeContentFunc('page', [], o)}>{o.title}</button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ObjectGrid