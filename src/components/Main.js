import React from 'react';

function Main(props) {
  const { randomAnimal } = props
  return(
    <React.Fragment>
      {/* random animal endpoint */}
      <h2>Main Page</h2>
      {(!randomAnimal) ?
      <h2>loading...</h2>
      :
      <div>
      <h2>Random friend of the day: {randomAnimal.name}</h2>
      <img src="https://cataas.com/cat/cute" width="400" />
      <p>{randomAnimal.name} is a {randomAnimal.age} year old {randomAnimal.sex} {randomAnimal.breed} {randomAnimal.species}.</p>
      </div>}
      <button onClick={props.toggleNewForm}>Add an Animal</button>
    </React.Fragment>
  );
}

export default Main;