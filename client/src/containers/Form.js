import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component{
  constructor(props){
    super(props);
    
    const initialState = this.props.formInputs.reduce((result, item, index) => {
      result[item.name] = "";
      return result;
    }, {});
    
    this.state = initialState;
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formOnChangeHandler = this.formOnChangeHandler.bind(this);
  }
  
  componentDidMount(){
    this.props.resetMessages();
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.submitAction(this.state);
  }
  
  formOnChangeHandler(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.props.formInputs.map((input, index) => {
            return(
              <div key={index}>
                <FormInput 
                  data={input}
                  onChangeHandler={this.formOnChangeHandler}
                  parentValue={this.state[input.name]}
                />
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
  resetMessages : PropTypes.func.isRequired,
  messages : PropTypes.object,
  formInputs : PropTypes.arrayOf(PropTypes.shape({
    name : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired
  })),
};

const FormInput = (props) => {
  const { data, onChangeHandler, parentValue } = props;
  return(
    <input 
      name={data.name}
      type={data.type} 
      placeholder={data.title} 
      onChange={onChangeHandler}
      value={parentValue}
    />
  );
};

const SubmissionManager = (props) => {
  let errorsList = [];
  props.formInputs.map((input, index) => {
    const inputTarget = props.state[input.name];
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