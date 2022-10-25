import React from "react"
import RenderContent from "./RenderContent"
import Deparments from "./Departments"
import Locations from "./Locations"
import ObjectGrid from "./ObjectGrid"
import ObjectPage from "./ObjectPage"
import Time from "./Time"

class Navigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: '',
      objIDs: []
    }
    this.setTab = this.setTab.bind(this);
    this.getComponent = this.getComponent.bind(this);
  }
  
  setTab(tab, objs = [], currentObj = {}) {
    this.setState({
      currentTab: tab,
      objIDs: objs,
      currentObj: currentObj
    })
  }

  getComponent() {
    let component;
    switch (this.state.currentTab){
      case 'department' :
        component = <Deparments changeContent={ this.setTab } />;
          break;
      case 'location' :
          component = <Locations />;
          break;
      case 'time' :
          component = <Time />;
        break;
      case 'grid':
        component = <ObjectGrid objs={ this.state.objIDs } changeContent={ this.setTab } />
        break
      case 'page':
        component = <ObjectPage obj={this.state.currentObj} />
        break
      default:
        component = <RenderContent />;
        break;
    }
    return component;
  }

  render() {
    return (
      <div>
        <div id="nav">
          <button type="button" onClick={ () => this.setTab('department') } className="btn btn-primary btn-lg">Departments</button>
          <button type="button" onClick={ () => this.setTab('location') } className="btn btn-primary btn-lg">Locations</button>
          <button type="button" onClick={ () => this.setTab('time') } className="btn btn-primary btn-lg">Time</button>
        </div>
        <div>
          {this.getComponent()}
        </div>
      </div>
    )
  }
}

export default Navigator