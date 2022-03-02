import React from 'react';
import Header from './Header';
import AnimalControl from './AnimalControl';

function App() {

  const bodyStyle = {
    // backgroundColor: "darkgrey"
  }

  return (
    <React.Fragment>
      <div className="container" style={bodyStyle}>
        <Header />
        <AnimalControl />
      </div>
    </React.Fragment>
  );
}

export default App;
