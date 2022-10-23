import React from "react"

class RenderContent extends React.Component {

  state = {
      content: ''
  }
  componentDidMount() {
    const location = fetch('https://api.opentripmap.com/0.1/en/places/geoname?name=sydney&apikey=5ae2e3f221c38a28845f05b6fd9e5b62acfad5e73932cca09fa92c71')
    .then(res => res.json())

    const xidList = fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${location.lon}&lat=${location.lat}&limit=5&apikey=5ae2e3f221c38a28845f05b6fd9e5b62acfad5e73932cca09fa92c71`).then(res => res.json())

    const xid = xidList.features[4].properties.xid

    const infoObj = fetch(`https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b6fd9e5b62acfad5e73932cca09fa92c71`).then(res => res.json())
              

  }

  render() {
    return(
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  )}

}



export default RenderContent