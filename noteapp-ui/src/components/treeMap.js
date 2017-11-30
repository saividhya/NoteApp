import React from 'react'
import PropTypes from 'prop-types'
import TreeMap from "react-d3-treemap";

class TreeMapComponent extends React.Component {
  render () {
   return(
     <TreeMap
       height={500}
       width={800}
       animation
       data={this.props.data}/>
   )
  }
}

export default TreeMapComponent;
