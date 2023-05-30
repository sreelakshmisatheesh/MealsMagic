import React from 'react';
import '../Styles/home.css';

class Wallpaper extends React.Component {

    handleLocationChange = (event) => 
    {
         const locationQuickId = event.target.value;
         sessionStorage.setItem('locationsessionId', locationQuickId); //anyvar : eventvalue{this anyvar is gonna sent in qsitem}
    }

    render() {
        const { locationsData } = this.props; //relation_parent
        return (
            <div>
                {/* Adding Wallpaper */}
                <img src="./Assets/homepageimg.png" alt='widepic' width="100%" height="450" />
                <div>

                    <div className="logo">
                        <p> ♏  </p>
                    </div>

                    <div className="headings">
                        Welcome to MealsMagic!
                    </div>

                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handleLocationChange} >
                            <option value="0">Select</option> 

                            {locationsData.map((item) => 
                            {   //locationsmg
                                return <option value={item.location_id} /*like option value="0" , db le value*/>  {`${item.name}, ${item.city}`}  </option> //item.dbname{Edappalli, Cochin}
                            }
                            )}
                            
                        </select>

                        <div>
                            <span className="glyphicon glyphicon-search search"></span>
                            <input className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Wallpaper;

