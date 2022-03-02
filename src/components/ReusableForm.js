import React from 'react';

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input type="text" name="name" placeholder="Animal name" defaultValue={props.selectedAnimal.name} />
        <input type="text" name="sex" placeholder="sex" defaultValue={props.selectedAnimal.sex} />
        <input type="text" name="breed" placeholder="breed" defaultValue={props.selectedAnimal.breed} />
        <input type="text" name="species" placeholder="species" defaultValue={props.selectedAnimal.species} />
        <input type="number" name="age" placeholder="age" defaultValue={props.selectedAnimal.age} />
        <button type="submit">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

export default ReusableForm ;