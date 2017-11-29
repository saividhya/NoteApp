import Heart from 'react-icons/lib/go/heart';
import Share from 'react-icons/lib/md/share';
import Pin from 'react-icons/lib/go/pin';
import Trash from 'react-icons/lib/go/trashcan';
import Public from 'react-icons/lib/md/public'
import Collab from 'react-icons/lib/md/people-outline'
import Priv from 'react-icons/lib/md/perm-identity'
import Cookies from 'universal-cookie';
import React  from 'react'
import {updateNoteById,deleteNoteById} from './api.js'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {TextComponent} from './util.js'

export class HeartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleUnlike=this.handleUnlike.bind(this);
    this.handleLike=this.handleLike.bind(this);
  }
  handleUnlike(event) {
    console.log("unlike")
    console.log(this.props.id)
    const cookies = new Cookies();
    let likes = this.props.likes
    let noteId= this.props.id
    likes=likes.filter(e=> e!==cookies.get("email"))
    let payload={
      "likes":likes
    }
    updateNoteById(noteId,payload).then( (response) => {
      if(response.ok) {
        window.location.reload()
      }
    }).catch (function (error) {
        console.log('Request failed', error);
      })

  }
  handleLike(event) {
    console.log("like")
    console.log(this.props.id)
    const cookies = new Cookies();
    let likes = this.props.likes
    if ("undefined"  === typeof likes) {
      likes=new Array()
    }
    let noteId= this.props.id
    likes.push(cookies.get("email"))
    let payload={
      "likes":likes
    }
    console.log(payload)
    updateNoteById(noteId,payload).then( (response) => {
      if(response.ok) {
        window.location.reload()
      }
    }).catch (function (error) {
        console.log('Request failed', error);
      })
  }

  render () {
    const cookies = new Cookies();
    return(
      <span>
      {
        "undefined"  !== typeof this.props.likes
        && this.props.likes.indexOf(cookies.get('email')) >= 0?
        (<Heart style={{color: '#E74c3c'}} onClick={this.handleUnlike}/>)
        : (<Heart onClick={this.handleLike}/>)
      }
      </span>

    )

  }
}




export class PinComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleUnpin=this.handleUnpin.bind(this);
    this.handlePin=this.handlePin.bind(this);
  }
  handleUnpin(event) {
    console.log("unpin")
    console.log(this.props.id)
    const cookies = new Cookies();
    let pins = this.props.pins
    let noteId= this.props.id
    pins=pins.filter(e=> e!==cookies.get("email"))
    let payload={
      "pins":pins
    }
    updateNoteById(noteId,payload).then( (response) => {
      if(response.ok) {
        window.location.reload()
      }
    }).catch (function (error) {
        console.log('Request failed', error);
      })

  }
  handlePin(event) {
    console.log("pin")
    console.log(this.props.id)
    const cookies = new Cookies();
    let pins = this.props.pins
    if ("undefined"  === typeof pins) {
      pins=new Array()
    }
    let noteId= this.props.id
    pins.push(cookies.get("email"))
    let payload={
      "pins":pins
    }
    console.log(payload)
    updateNoteById(noteId,payload).then( (response) => {
      if(response.ok) {
        window.location.reload()
      }
    }).catch (function (error) {
        console.log('Request failed', error);
      })
  }

  render () {
    return(
      <span>
        {this.props.pinned ?
          (<Pin style={{color: '#8A2BE2'}} onClick={this.handleUnpin}/>) :
          (<Pin onClick={this.handlePin}/>)
        }
      </span>

    )

  }
}


export class TrashComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handledelete=this.handledelete.bind(this);
  }

  handledelete(event) {
    console.log("delete")
    console.log(this.props.id)
    let noteId=this.props.id
    deleteNoteById(noteId).then( (response) => {
      if(response.ok) {
        window.location.reload()
      }
    }).catch (function (error) {
        console.log('Request failed', error);
      })
  }


  render () {
    return(
      <span>
        <Trash onClick={this.handledelete}/>
      </span>

    )

  }
}




export class ShareComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      errors: {}
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(id,value) {
    let stateValue={};
    stateValue[id]=value;
    this.setState(stateValue);
  }

  validateSubmit() {
    var errors = {}
    if(this.state.email === "") {
      errors.userName = "Email is required";
    }


    //if("undefined"  === typeof this.state.data[response]) {
    //    errors.userName = "User Name is not valid"
    //}
    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    var errors = this.validateSubmit();
    let contributors = this.props.contributors
    let noteId= this.props.id
    console.log(noteId)
    if ("undefined"  === typeof contributors) {
      contributors=new Array()
    }
    if (this.state.email!="") {
      contributors.push(this.state.email)
      let payload={
        "contributors":contributors
      }
      console.log(payload)
      updateNoteById(noteId,payload).then( (response) => {
        if(response.ok) {
          window.location.reload()
          this.setState({
            modal: !this.state.modal
          });
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })
      }
      else {
        console.log("username required")
      }

  }

  handleClick(event) {
    console.log(event.target.name)
    console.log("delete")
    let contributors = this.props.contributors
    let noteId= this.props.id
    contributors=contributors.filter(e=> e!==event.target.name)
    console.log(contributors)
    let payload={
      "contributors":contributors
    }
    updateNoteById(noteId,payload).then( (response) => {
      if(response.ok) {
        window.location.reload()
        this.setState({
          modal: !this.state.modal
        });
      }
    }).catch (function (error) {
        console.log('Request failed', error);
      })
  }

  render() {
    const cookies = new Cookies();
    return (
      <span>
        <Share onClick={this.toggle}/>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Share</ModalHeader>
            <ModalBody>
              <TextComponent holder="Enter Email" value={this.state.email}
                id="email" label="Email" onChange={this.handleChange}
                errors={this.state.errors.email}/>
                {
                  "undefined"  !== typeof this.props.contributors?
                  (this.props.contributors.filter(e=> e!==cookies.get("email")).map(row=>
                  <span key={row}>{row}&nbsp;<a name={row}
                    style={{color: '#007bff', cursor:'pointer'}}
                    onClick={this.handleClick}>x</a><br/></span>)):""
                }
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Share</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}




export class AccessIcon extends React.Component {
  constructor(props) {
    super(props);

    }
  render () {
    if(this.props.icon==="public")
     {

         return <Public/>
      }

     if(this.props.icon==="private")
      {
          return <Priv/>

      }

      if(this.props.icon==="collaborate")
       {

           return <Collab/>
       }
    }

}
