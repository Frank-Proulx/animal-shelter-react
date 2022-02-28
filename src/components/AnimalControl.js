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
    };
  }

  handleSearch = () => {
    this.setState({
      searchPageShowing: !searchPageShowing
    })
  }

  render() {
    let currentlyVisible = null;
    if (!this.state.searchPageShowing && this.state.selectedAnimal === null) {
      currentlyVisible = <Main handleSearch={this.handleSearch} />
    } else if (searchPageShowing) {
      currentlyVisible = <AnimalList />
    } else if (selectedAnimal !== null) {
      currentlyVisible = <AnimalDetail selectedAnimal={selectedAnimal} />
    } else {
      currentlyVisible = <h1>Something went wrong</h1>
    }
    return(
      <React.Fragment>{currentlyVisible}</React.Fragment>
    );
  }
}

export default AnimalControl;