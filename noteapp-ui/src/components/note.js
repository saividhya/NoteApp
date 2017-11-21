import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import note from './data/note.json'
import { Jumbotron,Form,Row,Col,Button } from 'reactstrap';

class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: 'Hello Kili' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    //console.log(note);
    this.setState({text:note.content})
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  handleSubmit(event) {
    console.log(this.state.text)
  }

  render() {
    return (
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col/>
            <Col/>
            <Col/>
            <Col>
              <p className="text-right"><Button color="primary"
              type="submit" value="Submit">Save</Button></p>
            </Col>
          </Row>
          <ReactQuill value={this.state.text}
                    onChange={this.handleChange}>
          </ReactQuill>
        </Form>
      </Jumbotron>
    )
  }
}

export default Note;
