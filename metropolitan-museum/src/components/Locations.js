import React from "react"
import { ReactBingmaps  } from "react-bingmaps";

function Locations() {
  const mapClick = event => {
    console.log("map click")
  }

  return (
      <div className="map-one">
        <ReactBingmaps bingmapKey="An9_eo8N3Mad7k2FtD-2NJycKtbyogZLcJ7fWGRJ_uirqCn9fn-W7-cSN-O4DZbB" />
      </div>
    )
}

export default Locations