import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';
import Firebase from 'firebase';
import { Form } from 'formsy-react';

import FormBuilder from '../form/FormBuilder';

import {
    Row,
    Col,
    Icon,
    Grid,
    Badge,
    Panel,
    Button,
    PanelBody,
    FormGroup,
    LoremIpsum,
    FormControl,
    ButtonGroup,
    ButtonToolbar,
    PanelContainer,
    Alert
} from '@sketchpixy/rubix';

@withRouter
export default class Login extends React.Component {

  constructor(props, context){
    super(props, context);

    this.state = {
      result: null
    }
  }

  back(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.router.goBack();
  }

  componentDidMount(){
    $('html').addClass('authentication');
  }

  componentWillUnmount(){
    $('html').removeClass('authentication');
  }

  getSchema(){

    return [
      {
        title: "Username",
        id: "country",
        type: "text",
        default: "kuwait",
        props: {
          componentClass: "select",
          name: "username"
        }
      },
      {
        title: "Password",
        id: "password",
        type: "text",
        props: {
          type: "password",
          name: "password",
          placeholder: "******"
        }
      }

    ]
  }

  setResult(message, type){
    this.setState({result: {type, message}});
  }

  renderResult(){
    const { type,message } = this.state.result;
    return <Alert bsStyle={type}>
      <span>{message}</span>
    </Alert>
  }

  goLogin(){
    this.setResult("You are successfully logged in, please wait... ", "success")
    setTimeout(_ => this.props.router.push('/'), 2000);
  }

  onSubmit(values){
    console.log("Authntication with:", values);
    const { username,password } = values;
    Firebase.auth().signInWithEmailAndPassword(username, password)
        .then(_ => this.goLogin())
        .catch(e => this.setResult(e.message, "danger"))
  }

  render(){
    const result = this.state.result !== null ? ::this.renderResult() : null;
    const schema = this.getSchema();

    return (
        <div id='auth-container' className='login'>
          <div id='auth-row'>
            <div id='auth-cell'>
              <Grid>
                <Row>
                  <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                    <PanelContainer>
                      <Panel>
                        <PanelBody style={{padding: 0}}>
                          <div className='text-center bg-darkblue fg-white'>
                            <h3 style={{margin: 0, padding: 25}}>Sign in to Simsar admin panel</h3>
                          </div>
                          <div>

                            {result}

                            <div
                                style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                              <FormBuilder submitText={"Login"}
                                           schema={schema}
                                           isCancel={false}
                                           onSubmit={::this.onSubmit}/>
                            </div>
                          </div>
                        </PanelBody>
                      </Panel>
                    </PanelContainer>
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
    );
  }
}
