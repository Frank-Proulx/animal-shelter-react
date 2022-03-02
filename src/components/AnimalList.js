import React from "react";

function AnimalList(props) {
  const {sex, species, breed} = props;

  const listStyle = {
    list: {
      textAlign: "center"
    },
    dropdown: {
      display: "inline",
    },
    select: {
      fontSize: "22px"
    },
    p: {
      marginTop: "-10px",
      marginBottom: "6px"
    },
    animalCard: {
      boxSizing: "border-box",
      width: "25%",
      margin: "auto",
      padding: "5px",
      border: "1px dotted black",
    }
  }

  return (
    <React.Fragment>
      <div style={listStyle.list}>
        <h2>Wonderful Pets Who Need A Home</h2>
        <form style={listStyle.dropdown} onChange={props.handleSex}>
          <select style={listStyle.select} name="sex" id="sex" value={sex}>
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </form>
        <form style={listStyle.dropdown} onChange={props.handleSpecies}>
          <select style={listStyle.select} name="species" id="species" value={species}>
            <option value="Any">Any</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Other">Other</option>
          </select>
        </form>
        <form style={listStyle.dropdown} onChange={props.handleBreed}>
          <select style={listStyle.select} value={breed}>
            <option value="All Breeds">All Breeds</option>
            {props.animalArray.map((animal, index) => 
              <option value={animal.breed} key={index}>{animal.breed}</option>
            )}
          </select>
        </form>
        <button className="btn btn-primary" onClick={props.resetFilters}>Reset Filters</button>
        {props.filteredArray.map((animal, index) => {
          return(
          <div key={index} style={listStyle.animalCard} className="box">
            <h3 onClick={()=>props.handleDetail(animal.id)} className="link">{animal.name} - {animal.species}</h3>
            <p style={listStyle.p}>{animal.breed}</p>
            <p style={listStyle.p}>{animal.species}, {animal.age} years old</p>
            <p style={listStyle.p}>{animal.sex}</p>
          </div>)
        })}
      </div>
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
<button className="btn btn-primary" type="submit">Search</button>
</form> */}