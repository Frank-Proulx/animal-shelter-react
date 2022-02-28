import React from 'react';

function Main(props) {
  return(
    <React.Fragment>
      {/* random animal endpoint */}
      <h2>Main Page</h2>
      <button onClick={props.handleSearch}></button>
    </React.Fragment>
  );
}

export default Main;