import React from "react"

class ObjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      obj: props.obj,
      desc: null
    }

    this.getDesc = this.getDesc.bind(this)
  }

  componentDidMount() {
    this.getDesc(this.state.obj.objectURL)
  }

  getDesc(url) {
    fetch(url).then(res => res.text()).then(html => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      this.setState({
        obj: this.state.obj,
        desc: doc.getElementsByClassName('artwork__intro__desc')[0].children[0].innerHTML
      })
    })
  }

  render() {
    const obj = this.state.obj;
    return (
      <div className="art-object">
        <div className="artwork-info">
          <div>
            <h1>{obj.title}</h1>
            <h4>{obj.artistDisplayName}</h4>
            <h5>{obj.artistDisplayBio}</h5>
            <p>{ this.state.desc}</p>
          </div>
          <div className="art-img">
            <img src={ obj.primaryImage } alt="primaryImage" />
          </div>
        </div>
        <div>

        </div>
      </div>
    )
  }
}

export default ObjectPage