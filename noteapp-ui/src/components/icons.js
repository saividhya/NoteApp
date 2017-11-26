import Heart from 'react-icons/lib/go/heart';
import Share from 'react-icons/lib/md/share';
import Pin from 'react-icons/lib/go/pin';
import Cookies from 'universal-cookie';
import React  from 'react'
import {updateNoteById} from './api.js'


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
