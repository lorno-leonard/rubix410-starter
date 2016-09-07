import React , {Component} from 'react';
import InputField from './Input';
import Select from './Select';
import {Button,Grid,Row,Col,BPanel} from '@sketchpixy/rubix';

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
                resultField =
                    <InputField type="text"
                                controlId={`${id}[${k}]`}
                                label={title}
                                type="text"
                                name={`${id}[${k}]`}/>;
                break;
              case 'select':
                resultField = <Select controlId={`${id}[${k}]`} label={title} name={`${title}[${k}]`}/>;
                break;
            }
            return <Grid key={`${title}[${k}]`} style={{paddingTop:"15px"}}>
              <Row>
                <BPanel>
                  <Col md={10}>
                    {resultField}
                  </Col>
                  <Col md={2} style={{paddingTop:"25px"}}>
                    <Button href="#" bsStyle="danger" onClick={e=>onRemove(e,k)}>X</Button>
                  </Col>
                </BPanel>
              </Row>
            </Grid>
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
          <div className="clearfix">
            <Button bsClass="pull-right btn-primary btn-default btn" type="button"
                    onClick={()=>this.appendField()}>Add {title} </Button>
          </div>
          <Fields fields={fields} id={id} type={type} title={title} onRemoveField={(pos)=>this.removeField(pos)}/>
        </div>

    )

  }
}
