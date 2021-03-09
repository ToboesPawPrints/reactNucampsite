import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from '../DirectoryComponents';
import { CAMPSITES } from '../shared/campsites.js';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsite});
    }

  render() {
      return (
          <div className="Main">
              <Navbar dark color="primary">
              <div className="container">
                  <NavbarBrand href="/">NuCamp</NavbarBrand>
              </div>
              </Navbar>
              <Directory campsites={this.state.campsiteId} onClick={() => this.onCampsiteSelect(campsite)}/>
              <CampsiteInfo campsite={this.state.selectedCampsite} />
          </div>
      );
  }
}


export default Main;
