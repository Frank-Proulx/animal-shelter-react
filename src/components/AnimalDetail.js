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
      <img src={selectedAnimal.url} width="400" />
      <p>{selectedAnimal.name} is a {selectedAnimal.age} year old {selectedAnimal.sex} {selectedAnimal.breed} {selectedAnimal.species}.</p>
      <button className="btn btn-primary" onClick={props.toggleEditForm}>Update this pet</button>
      <button className="btn btn-primary" onClick={()=>props.deleteAnimalCall(selectedAnimal.id)}>Delete this pet</button>
    </React.Fragment>
  )
}

export default AnimalDetail;