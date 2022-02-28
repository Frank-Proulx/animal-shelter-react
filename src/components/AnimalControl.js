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
        animalArray: jsonifiedResponse
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

  handleFilter = () => {
    this.setState({
      filteredArray: ["working!"]
    })
    console.log(this.state.filteredArray)
  }

  render() {
    let currentlyVisible = null;
    let buttonText;
    if (!this.state.searchPageShowing && this.state.selectedAnimal === null) {
      currentlyVisible = <Main handleSearch={this.handleSearch} />;
      buttonText = "Search Animals"
    } else if (this.state.searchPageShowing) {
      currentlyVisible = <AnimalList handleFilter={this.state.handleFilter} animalArray={this.state.animalArray} handleDetail={this.handleDetail} />
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