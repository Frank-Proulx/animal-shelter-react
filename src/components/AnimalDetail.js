import React from 'react';

function AnimalDetail(props) {
  const {selectedAnimal, resultsMessage} = props;
  return(resultsMessage ?
      <React.Fragment>
        <h2>{resultsMessage}</h2>
      </React.Fragment>
      :
    <React.Fragment>
      <h2>{selectedAnimal.name}</h2>
      <img src="https://cataas.com/cat/cute" width="400" />
      <p>{selectedAnimal.name} is a {selectedAnimal.age} year old {selectedAnimal.sex} {selectedAnimal.breed} {selectedAnimal.species}.</p>
      <button>Update this pet</button>
      <button onClick={()=>props.deleteAnimalCall(selectedAnimal.id)}>Delete this pet</button>
    </React.Fragment>
  )
}

export default AnimalDetail;