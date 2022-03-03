import React from 'react';
import Main from './Main';
import AnimalList from './AnimalList';
import AnimalDetail from './AnimalDetail';
import EditForm from './EditForm';
import NewAnimalForm from './NewAnimalForm';

class AnimalControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPageShowing: false,
      selectedAnimal: null,
      animalArray: [],
      filteredArray: null,
      sex: "All",
      species: "Any",
      breed: "All Breeds",
      shouldUpdate: false,
      resultsMessage: null,
      editFormVisible: false,
      newFormVisible: false,
      randomAnimal: null,
      breedArray: []
    };
  }
  
  componentDidMount() {
    this.makeApiCall();
    this.randomApiCall();
    console.log("I made a call");
  }

  makeApiCall = () => {
    fetch(
      `http://localhost:3000/api/v1/animals`
    ).then((response) => response.json())
    .then((jsonifiedResponse) => {
      let breedNames = jsonifiedResponse.map(object => {
        return object.breed;
      });
      this.setState({
        animalArray: jsonifiedResponse.sort((a,b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        }),
        breedArray: [...(new Set(breedNames.sort()))],
        filteredArray: this.state.filteredArray || jsonifiedResponse
      })
    })
      .catch((error) => {
        this.setState({
          error
      })
    })
  }

  handleSearch = () => {
    this.setState({
      selectedAnimal: null,
      searchPageShowing: !this.state.searchPageShowing,
      resultsMessage: null,
      editFormVisible: false,
      shouldUpdate: true,
      newFormVisible: false
    })
  }

  handleDetail = (id) => {
    this.setState({
      searchPageShowing: false,
      selectedAnimal: this.state.animalArray.filter((animal) => animal.id === id)[0]
    })
  }

  filterAnimals = () => {
    const { sex, species, breed } = this.state;
    if (sex === "All" && species === "Any" && breed === "All Breeds") {
      this.setState({filteredArray: this.state.animalArray})
    } else if (sex !== "All" && species !== "Any" && breed !== "All Breeds"){
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => 
        animal.sex === sex 
        && animal.species === species 
        && animal.breed === breed)
      })
    } else if (sex !== "All" && species === "Any" && breed === "All Breeds") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.sex === sex)
      })
    } else if (sex !== "All" && species !== "Any" && breed === "All Breeds") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.sex === sex && animal.species === species)
      })
    } else if (sex !== "All" && species === "Any" && breed !== "All Breeds") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.sex === sex && animal.breed === breed)
      })
    } else if (breed !== "All Breeds" && species === "Any" && sex === "All") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.breed === breed)
      })
    } else if (breed !== "All Breeds" && species !== "Any" && sex === "All") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.breed === breed && animal.species === species)
      })
    } else if (species !== "Any" && breed === "All Breeds" && sex === "All") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.species === species)
      })
    }
    this.setState({shouldUpdate: false})
  }

  handleSex = (event) => {
    switch(event.target.value) {
      case "All":
        this.setState({sex: "All"})
        break;
      case "Male":
        this.setState({sex: "Male"})
        break;
      case "Female":
        this.setState({sex: "Female"})
        break;
    }
    this.setState({shouldUpdate: true})
  }
  
  handleSpecies = (event) => {
    switch(event.target.value) {
      case "Any":
        this.setState({species: "Any"})
        break;
      case "Dog":
        this.setState({species: "Dog"})
        break;
      case "Cat":
        this.setState({species: "Cat"})
        break;
      case "Other":
        this.setState({species: "Other"})
        break;
    }
    this.setState({shouldUpdate: true})
  }

  handleBreed = (event) => {
    this.setState({breed: event.target.value})
    this.setState({shouldUpdate: true})
  }

  resetFilters = () => {
    this.setState({
      sex: "All",
      breed: "All Breeds",
      species: "Any",
      filteredArray: this.state.animalArray
    })
  }

  componentDidUpdate() {
    console.log("I did update")
    if (this.state.shouldUpdate === true) {
      this.filterAnimals();
    }
  }

  deleteAnimalCall = (id) => {
    fetch(
      `http://localhost:3000/api/v1/animals/${id}`, {method: 'DELETE'}
    ).then((response) => response.json())
    .then((jsonifiedResponse) => {
      this.setState({
        resultsMessage: jsonifiedResponse.message
      })
    })
      .catch((error) => {
        this.setState({
          error
      })
    })
    this.setState({
      animalArray: this.state.animalArray.filter(animal => animal.id !== id),
      filteredArray: this.state.filteredArray.filter(animal => animal.id !== id),
      shouldUpdate: true
    })
  }

  editAnimalCall = (animal) => {
    const { id, sex, breed, name, species, age, url } = animal
    fetch(
      `http://localhost:3000/api/v1/animals/${id}?age=${age}&sex=${sex}&breed=${breed}&species=${species}&name=${name}&url=${url}`, {method: 'PUT'}
    ).then((response) => response.json())
    .then((jsonifiedResponse) => {
      this.setState({
        resultsMessage: jsonifiedResponse.message
      })
    })
      .catch((error) => {
        this.setState({
          error
      })
    })
    this.makeApiCall();
    this.setState({
      filteredArray: this.state.animalArray,
    })
    this.toggleEditForm();
  }

  newAnimalCall = (animal) => {
    const { url, sex, breed, name, species, age } = animal
    fetch(
      `http://localhost:3000/api/v1/animals?age=${age}&sex=${sex}&breed=${breed}&species=${species}&name=${name}&url=${url}`, {method: 'POST'}
    ).then((response) => response.json())
    .then((jsonifiedResponse) => {
      this.setState({
        selectedAnimal: jsonifiedResponse
      })
    })
      .catch((error) => {
        this.setState({
          error
      })
    })
    this.makeApiCall();
    this.setState({
      filteredArray: this.state.animalArray,
    })
    this.toggleNewForm();
  }

  toggleEditForm = () => {
    this.setState({
      editFormVisible: !this.state.editFormVisible
    })
  }

  toggleNewForm = () => {
    this.setState({
      newFormVisible: !this.state.newFormVisible
    })
  }

  randomApiCall = () => {
    fetch(
      `http://localhost:3000/api/v1/animals/random`
    ).then((response) => response.json())
    .then((jsonifiedResponse) => {
      this.setState({
        randomAnimal: jsonifiedResponse
      })
    })
      .catch((error) => {
        this.setState({
          error
      })
    })
  }

  render() {
    let currentlyVisible = null;
    let buttonText;
    if (this.state.editFormVisible) {
      currentlyVisible = <EditForm 
        editAnimalCall={this.editAnimalCall} 
        selectedAnimal={this.state.selectedAnimal} />
      buttonText="Back to list"
    } else if (this.state.newFormVisible) {
      currentlyVisible = <NewAnimalForm 
      newAnimalCall={this.newAnimalCall} />
      buttonText="See animal list"
    } else if (!this.state.searchPageShowing && this.state.selectedAnimal === null) {
      currentlyVisible = <Main 
        randomAnimal={this.state.randomAnimal}
        handleSearch={this.handleSearch} 
        toggleNewForm={this.toggleNewForm} />;
      buttonText = "Search Animals"
    } else if (this.state.searchPageShowing) {
      currentlyVisible = <AnimalList 
        resetFilters={this.resetFilters}
        shouldUpdate={this.state.shouldUpdate} 
        handleSpecies={this.handleSpecies} 
        handleSex={this.handleSex} 
        handleBreed={this.handleBreed} 
        filteredArray={this.state.filteredArray} 
        handleDetail={this.handleDetail} 
        animalArray={this.state.animalArray}
        sex={this.state.sex}
        species={this.state.species}
        breed={this.state.breed}
        breedArray={this.state.breedArray}
      />
      buttonText = "Back to Main"
    } else if (this.state.selectedAnimal !== null) {
      currentlyVisible = <AnimalDetail 
        selectedAnimal={this.state.selectedAnimal} 
        resultsMessage={this.state.resultsMessage} 
        deleteAnimalCall={this.deleteAnimalCall}
        toggleEditForm={this.toggleEditForm} />
      buttonText = "Back to List"
    } else {
      currentlyVisible = <h1>Something went wrong</h1>
    }
    return(
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleSearch}>{buttonText}</button>  
        {currentlyVisible}
      </React.Fragment>
    );
  }
}

export default AnimalControl;