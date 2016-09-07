import { Form } from 'formsy-react';
import React from 'react';
import { Button } from '@sketchpixy/rubix';

import InputField from './Input';
import Select from './Select';
import Dynamic from './Dynamic';


class FormBuilder extends React.Component {

  render(){
    const { schema,onSubmit } = this.props;

    return (
        <Form onSubmit={onSubmit}>
          {schema.map((field, k) =>{
            switch(field.type){
              case 'text':
                return <InputField key={k} type="text" id={field.id} {...field.props} />;
              case 'select':
                return <Select key={k} value={field.default} {...field.props} />;
              case "dynamic":
                return <Dynamic id={field.id} key={k} {...field.props} />;
                break;
            }
          })}
          <Button type="submit"  bsStyle='lightgreen'>cancel</Button>{' '}
          <button className="btn-primary btn btn-default">submit</button>
        </Form>
    );


  }
}

FormBuilder.propTypes = {
  schema: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default FormBuilder;
