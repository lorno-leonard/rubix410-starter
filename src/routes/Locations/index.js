import React from 'react';
import ReactDOM from 'react-dom';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import { loadLocations } from '../../model/locations';
import { withRouter,Link } from 'react-router';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    Table,
    Button,
    PanelContainer,
} from '@sketchpixy/rubix';


class LocationsList extends React.Component {

  constructor(props){
    super(props);
    this.state = {locations: {}, loaded: false};
  }

  componentWillMount(){
    loadLocations().then((locations) => this.setState({locations: locations.val(), loaded: true}));
  }

  componentDidMount(){
    $(ReactDOM.findDOMNode(this.locationTable))
        .addClass('nowrap')
        .dataTable({
          responsive: true,
          columnDefs: [
            {targets: [-1, -3], className: 'dt-body-right'}
          ]
        });
  }

  render(){
    if(!this.state.loaded)
      return null;

    let rows = [];
    forEach(this.state.locations, (v, k) =>{
      rows.push(<tr key={k}>
        <td><Link to={"locations"}>{v.title}</Link></td>
        <td>
          <Button bsStyle="danger"> X </Button>
        </td>
      </tr>)
    });

    return (
        <PanelContainer noOverflow>
          <Panel>
            <PanelHeader className='bg-green fg-white'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>Locations</h3>
                  </Col>
                </Row>
              </Grid>
            </PanelHeader>
            <PanelBody>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <Table ref={(c) => this.locationTable = c} className='display' cellSpacing='0' width='100%'>
                      <thead>
                      <tr>
                        <th>State</th>
                        <th>Country</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tfoot>
                      <tr>
                        <th>State</th>
                        <th>Country</th>
                        <th></th>
                      </tr>
                      </tfoot>
                      <tbody>
                      {rows}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
        </PanelContainer>
    );
  }
}

@withRouter
export default class Locations extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={12}>
            <LocationsList {...this.props} />
          </Col>
        </Row>
    );
  }

}
