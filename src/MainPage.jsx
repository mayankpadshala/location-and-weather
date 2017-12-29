import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { bake_cookie, read_cookie } from 'sfcookies';

class MainPage extends Component {

    constructor(props) {
        super(props);
    }


    render() {

            return (
                <div>
                    <div className='app-title'>
                        Locations
                    </div>

                    <div className='list-locations'>

                        {
                            this.props.locationsInfo && this.props.locationsInfo.map((location, k) => {
                                return (
                                    <div
                                        key={k}
                                        className='location-details'
                                    >
                                        <ul className="locations-grid">
                                            <li><span>Loaction</span> : {location.name}</li>
                                            <li><span>Temperature</span> : {location.main.temp}</li>
                                            <li><span>Humidity</span> : {location.main.humidity}</li>

                                        </ul>
                                    </div>
                                )
                            })
                        }

                        <div className="list-locations">
                            <div className="add-location">
                                <Link
                                    to='/searchPage'
                                >
                                    Add Book
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

        )
    }
}

export default MainPage