import React, { Component } from 'react'
import Slider from 'react-slick'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import {RecommendNotes} from './util.js'
export default class Recommender extends Component {
  render() {

    return (
        <div>
        <h2>Recommendations for You! </h2>
        <RecommendNotes notes={this.props.notes}/>
        </div>

    );
  }
}
