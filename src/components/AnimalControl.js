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
      shouldUpdate: false
    };
  }
  
  componentDidMount() {
    this.makeApiCall()
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
    const { sex, species } = this.state;
    if (sex === "All" && species === "Any") {
      this.setState({filteredArray: this.state.animalArray})
    } else if (sex !== "All" && species !== "Any"){
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.sex === sex && animal.species === species)
      })
    } else if (sex !== "All") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.sex === sex)
      })
    } else if (species !== "Any") {
      this.setState({
        filteredArray: this.state.animalArray.filter((animal) => animal.species === species)
      })
    }
    this.setState({shouldUpdate: false})
  }

  handleFilter = (event) => {
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

  // handleSpeciesFilter = (event) => {
  //   if (event.target.value === "Any") {
  //     this.setState({
  //       filteredArray: this.state.filteredArray
  //     })
  //   } else if (event.target.value === "Other") {
  //     this.setState({
  //       filteredArray: this.state.filteredArray.filter((animal) => animal.species !== "Cat" && animal.species !== "Dog")
  //     })
  //   } else {
  //     this.setState({
  //       filteredArray: this.state.filteredArray.filter((animal) => animal.species === event.target.value)
  //     })
  //   }
  // }

  render() {
    let currentlyVisible = null;
    let buttonText;
    if (!this.state.searchPageShowing && this.state.selectedAnimal === null) {
      currentlyVisible = <Main handleSearch={this.handleSearch} />;
      buttonText = "Search Animals"
    } else if (this.state.searchPageShowing) {
      currentlyVisible = <AnimalList makeApiCall={this.makeApiCall} shouldUpdate={this.state.shouldUpdate} handleFilter={this.handleFilter} filteredArray={this.state.filteredArray} animalArray={this.state.animalArray} handleDetail={this.handleDetail} filterAnimals={this.filterAnimals} />
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