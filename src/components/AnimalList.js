import React from "react";

function AnimalList(props) {
  const {sex, species, breed} = props;
  return (
    <React.Fragment>
      <h2>Animal List</h2>
      <form onChange={props.handleSex}>
        <select name="sex" id="sex" value={sex}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </form>
      <form onChange={props.handleSpecies}>
        <select name="species" id="species" value={species}>
          <option value="Any">Any</option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
          <option value="Other">Other</option>
        </select>
      </form>
      <form onChange={props.handleBreed}>
        <select value={breed}>
          <option value="All Breeds">All Breeds</option>
          {props.animalArray.map((animal, index) => 
            <option value={animal.breed} key={index}>{animal.breed}</option>
          )}
        </select>
      </form>
      <button onClick={props.resetFilters}>Reset Filters</button>
      {props.filteredArray.map((animal, index) => {
        return(
        <div key={index} onClick={()=>props.handleDetail(animal.id)}>
          {/* bar at the top with filter buttons */}
          {/* display api return */}
          <h3>{animal.name} - {animal.species}</h3>
          <p>{animal.breed}</p>
          <p>{animal.species}, {animal.age} years old</p>
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