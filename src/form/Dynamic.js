import React , {Component} from 'react';
import InputField from './Input';
import Select from './Select';
import {Button} from '@sketchpixy/rubix';

const Fields = ({ fields,type,title,id,onRemoveField }) =>{

  function onRemove(e, pos){
    e.preventDefault();
    onRemoveField(pos);
  }

  return (
      <div>
        {
          fields.map((field, k)=>{

            let resultField;

            switch(type){
              case 'text':
                resultField = <InputField key={`${title}[${k}]`} type="text" name={`${id}[${k}]`}/>;
                break;
              case 'select':
                resultField = <Select key={`${title}[${k}]`} name={`${title}[${k}]`}/>;
                break;
            }
            return <div> {resultField} <Button href="#" bsStyle="danger" onClick={e=>onRemove(e,k)}>X</Button></div>
          })
        }
      </div>
  )

};

export default class Dynamic extends Component {
  constructor(property, state){
    super(property);
    this.state = {fields: []}
  }

  appendField(){
    this.setState({fields: this.state.fields.concat(`${this.props.title}-${this.state.fields.length}`)});
  }

  removeField(pos){
    const fields = this.state.fields;
    this.setState({fields: fields.slice(0, pos).concat(fields.slice(pos + 1))})
  }

  render(){
    const { type, title, id  } = this.props;
    const { fields } = this.state;

    return (
        <div>
          <Button bsStyle="primary" type="button" onClick={()=>this.appendField()}>Add {title} </Button>
          <Fields fields={fields} id={id} type={type} title={title} onRemoveField={(pos)=>this.removeField(pos)}/>
        </div>
    )

  }
}
