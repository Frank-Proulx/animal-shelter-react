import React from 'react';
import Main from './Main';
import AnimalList from './AnimalList';
import AnimalDetail from './AnimalDetail';

class AnimalControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPageShowing: false,
      selectedAnimal: null,
      animalArray: [],
      filteredArray: [],
      sex: "All",
      species: "Any",
      breed: "All Breeds",
      shouldUpdate: false
    };
  }
  
  componentDidMount() {
    this.makeApiCall()
    console.log("I made a call");
  }

  makeApiCall = () => {
    fetch(
      `http://localhost:3000/api/v1/animals`
    ).then((response) => response.json())
    .then((jsonifiedResponse) => {
      this.setState({
        animalArray: jsonifiedResponse,
        filteredArray: jsonifiedResponse
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
    // } else if (sex === "All" && species !== "Any" && breed !== "All Breeds") {
    //   this.setState({
    //     filteredArray: this.state.animalArray.filter((animal) => animal.breed === breed)
    //   })
    } else if (sex === "All" && ((breed !== "All Breeds" && species !== "Any") || (breed !== "All Breeds" && species === "Any"))) {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => (animal.breed === breed))
      })  
    } else if (sex !== "All" && species === "Any" && breed === "All Breeds") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.sex === sex)
      })
    } else if (sex !== "All" && species !== "Any" && breed === "All Breeds") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.sex === sex && (animal.breed === breed || animal.species === species))
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

  render() {
    let currentlyVisible = null;
    let buttonText;
    if (!this.state.searchPageShowing && this.state.selectedAnimal === null) {
      currentlyVisible = <Main handleSearch={this.handleSearch} />;
      buttonText = "Search Animals"
    } else if (this.state.searchPageShowing) {
      currentlyVisible = <AnimalList 
        makeApiCall={this.makeApiCall} 
        shouldUpdate={this.state.shouldUpdate} 
        handleSpecies={this.handleSpecies} 
        handleSex={this.handleSex} 
        handleBreed={this.handleBreed} 
        filteredArray={this.state.filteredArray} 
        handleDetail={this.handleDetail} 
        filterAnimals={this.filterAnimals} 
        animalArray={this.state.animalArray}
      />
      buttonText = "Back to Main"
    } else if (this.state.selectedAnimal !== null) {
      currentlyVisible = <AnimalDetail selectedAnimal={this.state.selectedAnimal} />
      buttonText = "Back to List"
    } else {
      currentlyVisible = <h1>Something went wrong</h1>
    }
    return(
      <React.Fragment>
        {currentlyVisible}
        <button onClick={this.handleSearch}>{buttonText}</button>  
      </React.Fragment>
    );
  }
}

export default AnimalControl;