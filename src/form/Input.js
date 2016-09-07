import React from  'react';
import {HOC} from 'formsy-react';
import { FormControl,FormGroup,InputGroup,Icon,ControlLabel } from  '@sketchpixy/rubix';


class Input extends React.Component {


  constructor(props){
    super(props);
  }


  render(){
    const { controlId,type,placeholder,bsSize,label } = this.props;
    return (
        <FormGroup controlId={controlId}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl
              value={this.props.getValue()}
              type={type}
              onChange={(e) => this.props.setValue(e.target.value)}
              className='border-focus-blue'
              placeholder={placeholder}/>
        </FormGroup>
    );
  }
}


Input.defaultProps = {
  bsSize: "sm",
  type: "text",
  placeholder: '',
  label: ""
};

export default HOC(Input);
