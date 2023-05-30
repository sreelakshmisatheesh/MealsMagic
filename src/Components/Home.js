import React from 'react';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations_SV: [], //statevariable
            mealtypes_SV: []
        }
    }

    componentDidMount() 
    {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:4567/locations',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ locations_SV: response.data.locationsVS}) //statevariable : keyname@BNcode
            })
            .catch()

        axios({
            method: 'GET',
            url: 'http://localhost:4567/mealtypes',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ mealtypes_SV: response.data.mealtypesVS })
            })
            .catch()
    }

    render() {
        const { locations_SV, mealtypes_SV } = this.state; //to pass the data to child component
        return (
            <div>
                <Wallpaper locationsData={locations_SV} />     {/*anyvar = statevar */}
                <QuickSearch mealtypesData={mealtypes_SV} />
            </div>
        )
    }
}

export default Home;