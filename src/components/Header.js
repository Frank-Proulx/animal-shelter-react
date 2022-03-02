import React from 'react';

function Header() {

  const headerStyle = {
    fontSize: "50px",
    textAlign: "center",
    marginTop: "2vh"
  }

  return(
  <React.Fragment>
    <h1 style={headerStyle}>Lonely Friends Animal Shelter</h1>
  </React.Fragment>
  );
}

export default Header