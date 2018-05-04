import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid4 from 'uuid/v4';

export default class Form extends Component{
  constructor(props){
    super(props);
    
    const formState = this.props.formInputs.reduce((result, item, index) => {
      result[item.name] = "";
      return result;
    }, {});
    
    this.state = {
      formState,
      showMessages : false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formOnChangeHandler = this.formOnChangeHandler.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
    
    let formData = new FormData();
    this.props.formInputs.forEach((input) => {
      if(input.type === 'file' && this.state.formState[input.name]){
        this.state.formState[input.name].forEach((file) => {
          formData.append(input.name, file);
          formData.append(input.name + 'ids', uuid4());
        });
      }
      else{
        formData.append(input.name, this.state.formState[input.name]);
      }
    });
    
    this.props.submitAction(formData);
  }
  
  formOnChangeHandler(e){
    let value;
    if(e.target.files){
      value = Array.from(e.target.files);
    }else{
      value = e.target.value;
    }
    const formState = Object.assign(
      {}, this.state.formState, {[e.target.name] : value}
    );
    const nextState = Object.assign({}, this.state, { formState });
    
    this.setState(nextState);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.props.formInputs.map((input, index) => {
            return(
              <div key={index}>
              {
                input.type === "file" ? 
                <div>
                  <label> {input.title + ":"} </label>
                  <input
                    accept={input.accept}
                    multiple={input.multiple}
                    name={input.name}
                    type={input.type} 
                    onChange={this.formOnChangeHandler}
                  />
                </div>
                :
                <div>
                  <input
                    placeholder={input.title}
                    name={input.name}
                    type={input.type} 
                    onChange={this.formOnChangeHandler}
                  />
                </div>
              }
              <br />
              </div>
            );
          })}
          <SubmissionManager 
            state={this.state}
            formInputs={this.props.formInputs}
            submitString={this.props.submitString}
          />
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  submitAction : PropTypes.func.isRequired,
  submitString : PropTypes.string,
  messages : PropTypes.object,
  formInputs : PropTypes.arrayOf(PropTypes.shape({
    name : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired
  })),
};

const SubmissionManager = (props) => {
  let errorsList = [];
  props.formInputs.map((input, index) => {
    const inputTarget = props.state.formState[input.name];
    input.validation.map((rule, index) => {
      let legal = false;
      switch(rule.type){
        case "LENGTH" : {
          legal = rule.match(inputTarget.length);
          break;
        }
        case "REGEX" : {
          legal = rule.match.test(inputTarget);
        }
      }
      if(!legal){
        errorsList.push({
          name : input.title,
          errMessage : rule.errMessage
        });
      }
    });
  });
  
  return(
    <div>
      <input 
        type='submit'
        value={props.submitString}
        disabled={errorsList.length > 0}
        >
      </input>
      {errorsList.map((error, index) => {
        return(
          <div key={index}>
            {error.name +  " " + error.errMessage}
          </div>
        );
      })}
    </div>
  );
};