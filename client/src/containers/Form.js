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
  
  async handleSubmit(e){
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
          <input type='submit' value={this.props.submitString}></input>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  submitAction : PropTypes.func.isRequired,
  submitString : PropTypes.string,
  formInputs : PropTypes.arrayOf(PropTypes.shape({
      name : PropTypes.string.isRequired,
      title : PropTypes.string.isRequired,
      type : PropTypes.string.isRequired
    })
  ),
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