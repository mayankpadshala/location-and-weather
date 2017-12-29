import React, {Component} from 'react';
import {compose, withProps} from "recompose"

import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import SearchBox from 'react-google-maps/lib/components/places/SearchBox'

import {geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';

import {Link} from 'react-router-dom';

class MapView extends Component {

    state = {
        location: {lat: -34.397, lng: 150.644},
        map: undefined,
        searchBox: undefined,
    }

    constructor(props) {
        super(props);
        this.onMapMounted = (ref) => {
            this.setState({
                map: ref
            })
        }

        this.onSearchBoxMounted = (ref) => {
            this.setState({
                searchBox: ref
            })
        }

        this.onBoundsChanged = () => {
            this.setState({
                bounds: this.state.map.getBounds(),
                center: this.state.map.getCenter(),
            })
        }

        this.onPlacesChanged = () => {
            const places = this.state.searchBox.getPlaces();
            geocodeByPlaceId(places[0].place_id)
                .then(results => getLatLng(results[0]))
                .then(results => this.setState({location : results}))

        }


        this.mapClick = (address) => {
            let latitude = address.latLng.lat();
            let longitude = address.latLng.lng();
            const latlong = {
                lat: latitude,
                lng: longitude,
            }
            this.setState({location: latlong});
        }

        this.getWeatherData = () => {
            const weather_url = 'http://api.openweathermap.org/data/2.5/weather?';
            const api_key = '256ae562f0d051eaf698331ab8a38d0d';
            const fetch_url = `${weather_url}lat=${this.state.location.lat}&lon=${this.state.location.lng}&appid=${api_key}`;
            fetch(fetch_url, {
                    headers: {
                        // No need for special headers
                    }
                }
            ).then(response => {
                return response.json()
            }, err => {
                console.log('error in promise as a second argument: ', err)
                return Promise.reject(err)
            }).then(json => {
                this.props.sendJson(json);
            }).catch(err => {
                console.error("caught my error:: :: error", err)
            })
        }

    }

    render() {
        let latlng = this.state.location;
        if (this.props.markerLocation) {
            latlng = this.props.markerLocation;
        }
        const {lat, lng} = latlng

        return (
            <GoogleMap
                ref={this.onMapMounted}
                defaultZoom={10}
                onClick={this.mapClick}
                center={{lat, lng}}
            >

                <SearchBox
                    ref={this.onSearchBoxMounted}
                    controlPosition={2}
                    onPlacesChanged={this.onPlacesChanged}
                >
                    <div
                        style={{
                            width: `calc(100% - 20px)`,
                            height: `28px`,
                            marginTop: `50px`,
                            marginRight: `10px`,
                            marginLeft: `10px`,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Search for a location or click on map"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `calc(100% - 20px)`,
                                height: `28px`,
                                marginRight: `10px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                            }}
                        />
                        {
                            <Link
                                to={'/'}
                                style={ {
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    padding: '8px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                }}
                                onClick={this.getWeatherData}
                            >
                                Submit
                            </Link>
                        }


                    </div>


                </SearchBox>

                <Marker position={{lat, lng}}/>
            </GoogleMap>
        )
    }
}

export default compose(withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA2XZz15CRxB5ieprqQo2mdkTM8XIF5rmc",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `600px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap)(MapView)
