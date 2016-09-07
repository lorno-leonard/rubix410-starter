import { Form } from 'formsy-react';
import React from 'react';
import { Button } from '@sketchpixy/rubix';

import InputField from './Input';
import Select from './Select';
import Dynamic from './Dynamic';


class FormBuilder extends React.Component {

  render(){
    const { schema,onSubmit,isCancel,submitText } = this.props;

    return (
        <Form onSubmit={(values,reset)=> {onSubmit(values); reset();}}>
          {schema.map((field, k) =>{
            switch(field.type){
              case 'text':
                return <InputField key={k} type={field.type} id={field.id} label={field.title}
                                   controlId={field.id} {...field.props} />;
              case 'select':
                return <Select key={k} value={field.default} label={field.title}
                               controlId={field.id} {...field.props} />;
              case "dynamic":
                return <Dynamic id={field.id} key={k} controlId={field.id} {...field.props} />;
                break;
            }
          })}
          <div style={{margin:"10px 0"}}>
            {isCancel && <Button type="submit" bsStyle='lightgreen'>cancel</Button>}
            {' '}
            <button className="btn-primary btn btn-default">{submitText}</button>
          </div>
        </Form>
    );


  }
}

FormBuilder.defaultProps = {
  isCancel: true,
  submitText: "submit"
}

FormBuilder.propTypes = {
  schema: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default FormBuilder;
