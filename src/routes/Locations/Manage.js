import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';

import FormBuilder from '../../form/FormBuilder';
import { push as pushArea} from '../../model/areas';
import { push as pushLocation, loadLocation} from '../../model/locations';
import { set as setLocationAreas } from '../../model/locationAreas';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';


class LocationForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const locationId = this.props.params.id;

    if(edit === true){
      loadLocation(locationId).then(locationSnapshot =>{
        console.log('LOADED!', locationSnapshot);
      })
    }

  }

  getSchema(){

    return [
      {
        title: "Country",
        id: "country",
        type: "select",
        default: "kuwait",
        props: {
          componentClass: "select",
          name: "country",
          options: [
            {
              id: "kuwait",
              title: "Kuwait"
            },
            {
              id: "egypt",
              title: "Egypt"
            },
            {
              id: "ksa",
              title: "KSA"
            },
            {
              id: "qatar",
              title: "Qatar"
            }
          ]
        }
      },
      {
        title: "State",
        id: "title",
        type: "text",
        props: {
          type: "text",
          name: "title"
        }
      },
      {
        title: "Areas",
        id: "areas",
        type: "dynamic",
        props: {
          title: "Area",
          type: "text",
          placeholder: "Area title ..."
        }
      }

    ]
  }

  onSubmit(values){
    let locationTitle = values.title;
    pushArea(values.areas).then(snapshot =>{
      let locationId = pushLocation({title: locationTitle});
      let areaIds = snapshot.map(area => area.areaId);
      setLocationAreas(locationId, areaIds);
    });
  }

  render(){
    const schema = this.getSchema();

    return (
        <PanelContainer noOverflow>
          <Panel>
            <PanelHeader className='bg-green fg-white'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>Add new location </h3>
                  </Col>
                </Row>
              </Grid>
            </PanelHeader>
            <PanelBody>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <FormBuilder schema={schema} onSubmit={this.onSubmit}/>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
        </PanelContainer>
    );
  }
}

LocationForm.contextTypes = {
  langs: React.PropTypes.array
};

@withRouter
export default class ManageLocations extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={6} collapseRight>
            <LocationForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
