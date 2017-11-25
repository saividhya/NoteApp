import React, { Component } from 'react'
import Slider from 'react-slick'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import {RecommendNotes} from './util.js'
export default class Recommender extends Component {
  render() {

    return (
        <div>
        <p style={{fontSize: '2em'}}>Recommendations for You! </p>
        <RecommendNotes notes={this.props.notes}/>
        </div>

    );
  }
}
