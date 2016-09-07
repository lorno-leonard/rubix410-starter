import { FormControl,FormGroup,ControlLabel } from  '@sketchpixy/rubix';
import {HOC} from 'formsy-react';
import React from  'react';

class Select extends React.Component {
  render(){
    const { label,controlId } = this.props;
    return (
        <FormGroup controlId={controlId}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl componentClass="select"
                       placeholder="select"
                       value={this.props.getValue()}
                       onChange={(e) => this.props.setValue(e.target.value)}>
            {this.props.options.map(option=><option key={option.id} value={option.id}>{option.title}</option>)}
          </FormControl>
        </FormGroup>
    );
  }
}

export default HOC(Select);

