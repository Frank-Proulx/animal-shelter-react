import React from "react";

function AnimalList(props) {
  return (
    <React.Fragment>
      <h2>Animal List</h2>
      <form onChange={props.handleFilter}>
        <select name="sex" id="sex">
          <option value="any">any</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </form>
      {props.animalArray.map((animal) => {
        return(
        <div onClick={()=>props.handleDetail(animal.id)}>
          {/* bar at the top with filter buttons */}
          {/* display api return */}
          <h3>{animal.name} - {animal.species}</h3>
          <p>{animal.breed}, {animal.age} years old</p>
          <p>{animal.sex}</p>
        </div>)
      })}
    </React.Fragment>
  );
}

export default AnimalList;

{/* <form onSubmit={this.handleSubmit}>
<select name="regionList" id="regionList">
{this.state.regions.map((region, index) =>
  <option value={region.id} key={index}>{region.name}</option>
  )}
</select>
<button type="submit">Search</button>
</form> */}