import React from 'react';
import ReusableForm from 'ReusableForm';

function NewAnimalForm(props) {


  
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={} 
        buttonText={"Add animal"} />
    </React.Fragment>
  );
}

export default NewAnimalForm;