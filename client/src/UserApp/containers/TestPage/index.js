import React, { Component } from 'react';
import { Parser } from 'expr-eval';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import formConfig from './formConfig';

const parser = new Parser();

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const analysisFormDeps = (fields) => {
  const formElements = {};
  for (const field of fields) {
    const formElement = {};
    if (field.state && field.state.value) {
      const expr = parser.parse(field.state.value);
      formElement.subscribers = expr.variables();
    }
    formElements[field.name] = formElement;
  }
  return formElements;
};

const getForm = (fields = [], context) => {
  return fields.map((field) => {
    return (
      <div>
        <input
          type='text'
          label={field.title}
          name={field.name}
          maxLength={16}
          value={context.state && context.state[field.name]}
          ref={(input)=> context.formElements[field.name].ref = input}
          onChange={(e) => {
            const value = e.target.value;
            context.setState({
              [field.name]: value
            })
          }}
        />
      </div>
    );
  });
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.formElements = analysisFormDeps(formConfig, this);
    console.log('this.formElements', this.formElements)
  }

  render() {
    console.log('this', this);
    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper" style={{backgroundColor: '#ccc', width: '500px'}}>
          {getForm(formConfig, this)}
        </div>
      </div>
    );
  }
}

export default TestPage;