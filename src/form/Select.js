import {FormControl} from  '@sketchpixy/rubix';
import {HOC} from 'formsy-react';
import React from  'react';

class Select extends React.Component {
  render(){
    return (
        <FormControl componentClass="select" value={this.props.getValue()}
                     onChange={(e) => this.props.setValue(e.target.value)}>
          {this.props.options.map(option=><option key={option.id} value={option.id}>{option.title}</option>)}
        </FormControl>
    );
  }
}

export default HOC(Select);

