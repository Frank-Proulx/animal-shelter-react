import React from 'react';

function AnimalDetail(props) {
  const {selectedAnimal} = props;
  return(
    <React.Fragment>
      <h2>{selectedAnimal.name}</h2>
      <img src="https://cataas.com/cat/cute" width="400" />
      <p>{selectedAnimal.name} is a {selectedAnimal.age} year old {selectedAnimal.sex} {selectedAnimal.breed} {selectedAnimal.species}.</p>
    </React.Fragment>
  )
}

export default AnimalDetail;