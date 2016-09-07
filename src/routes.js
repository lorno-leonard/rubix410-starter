import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

import Footer from './common/footer';
import Header from './common/header';
import Sidebar from './common/sidebar';

import Home from './routes/home';
import Login from './routes/Login';
import Locations from './routes/Locations';

class App extends React.Component {
  render(){
    return (
        <MainContainer {...this.props}>
          <Sidebar />
          <Header />
          <div id='body'>
            <Grid>
              <Row>
                <Col xs={12}>
                  {this.props.children}
                </Col>
              </Row>
            </Grid>
          </div>
          <Footer />
        </MainContainer>
    );
  }
}

export default (

    <Route>
      <Route>
        <Route path='login' component={Login}/>
      </Route>

      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path="locations" component={Locations}/>
        <Route path="locations/:id" component={Locations}/>
      </Route>
    </Route>
);
