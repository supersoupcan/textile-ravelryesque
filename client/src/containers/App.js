import React, { Component } from 'react';
import { connect } from 'react-redux';


class App extends Component {
  render(){
    return(
      <div>
        <h1>React-Redux Boiler Plate</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(App);
