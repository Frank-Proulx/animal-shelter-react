import React from 'react';

function Main(props) {
  return(
    <React.Fragment>
      {/* random animal endpoint */}
      <h2>Main Page</h2>
      <p>Random animal goes here</p>
      <button onClick={props.toggleNewForm}>Add an Animal</button>
    </React.Fragment>
  );
}

export default Main;