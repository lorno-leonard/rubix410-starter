import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';
import Firebase from 'firebase';
import { Form } from 'formsy-react';

import InputField from '../form/Input';

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
    InputGroup,
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

  getPath(path){
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
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
    setTimeout( _ => this.props.router.push(this.getPath('dashboard')),2000);
  }

  submitLogin(e){
    console.log("Authntication with:",this.state);

    e.preventDefault();
    e.stopPropagation();

    const { email,password } = this.state;
    Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(_ => this.goLogin())
        .catch(e => this.setResult(e.message, "danger"))
  }

  render(){
    const result = this.state.result !== null ? ::this.renderResult() : null;

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
                              <Form onSubmit={::this.submitLogin}>
                                <InputField name="username" />
                                <InputField name="password" />

                              </Form>
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