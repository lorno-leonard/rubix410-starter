import React from  'react';
import {HOC} from 'formsy-react';
import {FormControl} from  '@sketchpixy/rubix';


class Input extends React.Component {
  render(){
    return (
        <FormControl value={this.props.getValue()}
                     onChange={(e) => this.props.setValue(e.target.value)}/>
    );
  }
}

export default HOC(Input);