import React from 'react';

function Main(props) {
  const { randomAnimal } = props

  const mainStyle = {
    textAlign: "center"
  }

  return(
    <React.Fragment>
      {(!randomAnimal) ?
      <h2>loading...</h2>
      :
      <div style={mainStyle}>
      <h2>Random friend of the day: {randomAnimal.name}</h2>
      <img src={randomAnimal.url} width="400" />
      <p>{randomAnimal.name} is a {randomAnimal.age} year old {randomAnimal.sex} {randomAnimal.breed} {randomAnimal.species}.</p>
      <button className="btn btn-primary" onClick={props.toggleNewForm}>Add an Animal</button>
      </div>}
    </React.Fragment>
  );
}

export default Main;