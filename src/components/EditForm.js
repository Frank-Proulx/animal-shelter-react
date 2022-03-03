import React from 'react';
import ReusableForm from './ReusableForm';

function EditForm(props) {

  function editFormSubmission(event) {
    event.preventDefault();
    const animal = {
      name: event.target.name.value,
      sex: event.target.sex.value,
      breed: event.target.breed.value,
      species: event.target.species.value,
      age: event.target.age.value,
      id: props.selectedAnimal.id,
      url: event.target.image_path.value
    }
    props.editAnimalCall(animal);
  }


  return(
    <React.Fragment>
      <ReusableForm 
        selectedAnimal={props.selectedAnimal}
        formSubmissionHandler={editFormSubmission} 
        buttonText={"Update animal"} />
    </React.Fragment>
  );
}

export default EditForm;