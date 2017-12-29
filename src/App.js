import React, {Component} from 'react'
import './App.css'
import MainPage from './MainPage'

import {Route} from 'react-router-dom'
import MapView from './MapView'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }
    }

    addLocation(location) {

    }

    render() {
        return (
            <div className='app'>
                <Route exact path='/' render={() => (
                    <MainPage locationsInfo={this.state.locations}/>
                )
                }
                />

                <Route path='/searchPage'
                       render={({history}) => (
                           <MapView
                               sendJson={(json) => {
                                   this.state.locations.push(json)
                                   console.log(this.state.locations)
                                   history.push('/')
                               }}

                               markerLocation={this.state.location}


                           />
                       )}
                />

            </div>
        )
    }
}

export default App