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
    fetch('https://www.metmuseum.org/art/collection/search/45734').then(res => res.text()).then(html => {
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
      <div>
        <img src={ obj.primaryImage } alt="primaryImage" />
        <p>{ this.state.desc}</p>
      </div>
    )
  }
}

export default ObjectPage