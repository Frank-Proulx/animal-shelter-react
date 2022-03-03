import React from 'react';
import ReusableForm from './ReusableForm';

function NewAnimalForm(props) {

  function newFormSubmission(event) {
    event.preventDefault();
    const animal = {
      name: event.target.name.value,
      sex: event.target.sex.value,
      breed: event.target.breed.value,
      species: event.target.species.value,
      age: event.target.age.value,
      url: event.target.image_path.value
    }
    props.newAnimalCall(animal);
  }


  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={newFormSubmission} 
        buttonText={"Add animal"} />
    </React.Fragment>
  );
}

export default NewAnimalForm;