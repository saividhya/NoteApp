import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import note from './data/note.json'
import { Jumbotron,Form,Row,Col,Button,Label } from 'reactstrap';
import {getNoteById,updateNoteById} from './api.js'
import {SelectComponent,TextComponent,Autocomplete} from './util.js'


class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      title: "",
      access: "",
      tags: [],
      accessItems:[
        {
          "objectId": 1,
          "objectName": "public",
        },
        {
          "objectId": 2,
          "objectName": "private",
        },
        {
          "objectId": 3,
          "objectName": "collaborate",
        },

      ]



     } // You can also pass a Quill Delta here
    this.handleTextChange = this.handleTextChange.bind(this)
      this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  componentWillMount() {
    //console.log(note);
    let noteId=this.props.match.params.id
    getNoteById(noteId).then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              this.setState({text:data.content})
              this.setState({access:data.access})
              this.setState({title:data.title})
              this.setState({tags:data.tags})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })
    //this.setState({text:note.content})
  }

  handleTextChange(value) {
    this.setState({ text: value })
  }

  handleChange(id,value) {
    let stateValue={};
    stateValue[id]=value;
    this.setState(stateValue);
  }

  handleTagChange(tags) {
    console.log(tags)
    this.setState({tags})
  }

  handleSubmit(event) {
    let noteId=this.props.match.params.id
    let payload= {
      "content": this.state.text,
      "title": this.state.title,
      "access": this.state.access,
      "tags": this.state.tags
    }
    updateNoteById(noteId,payload).then( (response) => {
      if(response.ok) {

      }
    }).catch (function (error) {
        console.log('Request failed', error);
      })

    //console.log(this.state.text)
  }

  render() {
    return (
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col/>
            <Col/>
            <Col>

            <Col>
              <p className="text-right"><Button
              value="Cancel" href="/" >Cancel</Button>
            &nbsp;&nbsp;
              <Button
              type="submit" value="Submit">Save</Button></p>
            </Col>
            </Col>
          </Row>
          </Form>
          <TextComponent holder="Title" value={this.state.title} id="title"
            label="Title" onChange={this.handleChange}/>
          <SelectComponent id="access" value={this.state.access} label="Access"
            options={this.state.accessItems} onChange={this.handleChange}/>
          <Label for="tags" sm={2}>Tags</Label>
          <Autocomplete id="tags" tags={this.state.tags} onChange={this.handleTagChange}/>

          <Label for="content" sm={2}>Content</Label>
          <ReactQuill id="content" value={this.state.text}
                    onChange={this.handleTextChange}>
          </ReactQuill>

      </Jumbotron>
    )
  }
}

export default Note;
