import React from 'react'
import PropTypes from 'prop-types'
import {searchNotes} from './api.js'
import { Row,Col,Jumbotron,Button, Label} from 'reactstrap';
import {Notes} from './util.js'

class Search extends React.Component {
  constructor(props) {
    super(props)
    super(props);
    this.state = {
      notes:[],
      publicNotes:[],
    }
  }

  componentWillMount() {
    let text=this.props.match.params.text
    console.log(text)
    searchNotes(text).then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              console.log(data)
              this.setState({notes:data.myNotes})
              this.setState({publicNotes:data.publicNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })

}

  render () {
    return(
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
        <Label style={{textAlign: 'center'}} for="note" sm={12}>Your Notes</Label>
        <Notes id="note" notes={this.state.notes}/>

        <Label style={{textAlign: 'center'}} for="public" sm={12}>Public Notes</Label>
        <Notes id="public" notes={this.state.publicNotes}/>
      </Jumbotron>
    )
  }
}

export default Search;
