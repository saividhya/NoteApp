import React from 'react'
import CircularProgressbar from 'react-circular-progressbar';
import '../static/css/circularprogress.css'
import { Row,Jumbotron,Col,FormGroup,Label,Input} from 'reactstrap';
import {getTags,getTreeMap} from './api.js'
import Cookies from 'universal-cookie';
import {getAuthors} from './api.js'
import PropTypes from 'prop-types'

//import {Treemap} from 'react-vis'
import 'react-vis/dist/style.css';
// Include its styles in you build process as well
import "react-d3-treemap/dist/react.d3.treemap.css";
import TreeMapComponent from './treeMap.js'
export class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.id,event.target.value)
  }
  render () {
    return(

      <FormGroup>
        <h2>Queries ? Check with the best people</h2>
        <Label for={this.props.id}>{this.props.label}</Label>

          <Input type="select" name={this.props.id} id={this.props.id} value={this.props.value} onChange={this.handleChange}>
            <option id="" value=""></option>
            {this.props.options.map(option =>
              <option key={option.name} id={option.name} value={option.name}>{option.name}</option>)}
          </Input>

      </FormGroup>
    )

  }
}

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag:"",
      tagItems:[],
      data:[

      ],
      treeMapData:{},
    }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id,value) {
    let stateValue={};
    stateValue[id]=value;
    this.setState(stateValue);
    let tag=value
    console.log(tag)
    getAuthors(tag).then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            x => {
              console.log(x)
              this.setState({data:x})
              // this.setState({recommendNotes:data.myNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })
  }

  componentWillMount() {
    getTags().then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              console.log(data)
              this.setState({tagItems:data})
              // this.setState({recommendNotes:data.myNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })

        getTreeMap().then( (response) =>
        {
            if(response.ok) {
              response.json().then(
                data => {
                  console.log(JSON.stringify(data))
                this.setState({treeMapData:data})
                  // this.setState({recommendNotes:data.myNotes})
                  //console.log(data.myNotes);

                  })
            }
          }).catch (function (error) {
              console.log('Request failed', error);
            })
            //console.log(treeMap)
      // this.setState({treeMapData:treeMap})


            //this.setState({treeMapData:treeMap})


  }
  componentDidMount() {
    getTreeMap().then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              console.log(JSON.stringify(data))
            this.setState({treeMapData:data})
              // this.setState({recommendNotes:data.myNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })
  }

  render () {
    let data=this.state.data
    let tree=this.state.treeMapData
    console.log(tree)
    const cookies = new Cookies();
    let treeData=this.state.treeMapData
    if (cookies.get("email")) {
      if(Object.keys(treeData).length !== 0) {
        return (
          <Jumbotron  style={{backgroundColor: '#FFFFFF'}}>
            <SelectComponent id="tag" value={this.state.tag} label="Tag"
              options={this.state.tagItems} onChange={this.handleChange}/>
              <br/>
              <Row>

                {
                  data.map(x =>
                    <Col key={x.author} xs="6" sm="4">
                      <div style={{height:"160px", width:"160px"}}>
                        <CircularProgressbar percentage={x.score} textForPercentage={
                          (pct) => `${pct}`
                      } />
                    <h6>{x.author}</h6>

                      </div>
                    </Col>
                    )
                }


              </Row>
              <br/>

                <br/>
                  <br/>
                    <br/>
                    
            <TreeMapComponent data={this.state.treeMapData}/>
          <br/>

            <br/>
              <br/>
                <br/>


          </Jumbotron>
        )
      }
      else {
        return(<h1></h1>)
      }

    }
      else {
        window.location="/login"
      }
  }
}

export default My;
