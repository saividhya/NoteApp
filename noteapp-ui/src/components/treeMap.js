import React from 'react'
import PropTypes from 'prop-types'
import TreeMap from "react-d3-treemap";
import { Jumbotron} from 'reactstrap';
class TreeMapComponent extends React.Component {
  render () {
   return(
     <div>
       <h2>Wanted to Find Popular Notes and Cheatsheet ?</h2>
       <Jumbotron style= {{backgroundColor:"#FFFFFF",color:"#A9A9A9"}}>
       <TreeMap
         height={500}
         width={800}
         animation
         valueUnit={""}
         data={this.props.data}
         />
   </Jumbotron>
 </div>
   )
  }
}

export default TreeMapComponent;
