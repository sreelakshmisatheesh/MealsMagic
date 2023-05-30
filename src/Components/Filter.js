import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

import '../Styles/filter.css';


class Filter extends React.Component 
{
    constructor()
    {   
        super();

        this.state = {
            restaurants_SV: [],
            locations_SV: []
        } //my response from axios is reaturants data
    }

    componentDidMount()
    {
      const qs = queryString.parse(this.props.location.search) //string -> object
      const{mealtype , location} = qs; //DESTRUCTURING LINK PASSING PARAMETER- mealtype=2
      const filterObj =
      {
        mealtype : Number(mealtype),
        location_VS : location //keydesbkn : keydesfn: mealtype :1; //framed in the form of expected output from home page le wuick search item
      }

    //   const eg_qs = {
    //     mealtype : 1
    //   };
    // console.log(mealtype)
            //mandatory paramenter = mealtype

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
                method: 'POST', //post api, therefore use data variable to get sort, lcost , hcost
                url: 'http://localhost:4567/filter',
                headers: { 'Content-Type': 'application/json' },
                data : filterObj  //passing filterobj as input of APi - (WIT -  INPUT IS DATA)
            })
                .then(response => {
                    this.setState({ restaurants_SV: response.data.restaurants }) //sV :respoweb {getting expected resp as restaurants}
                })
                .catch()
        

    }
    //side drop box same as filter logic
    handleLocationChange = (event) =>
    {
        const locationcapture = event.target.value;
        const{restaurants_SV , locations_SV} = this.state;
        const filterObj =
        {
          //this is not quesry string, tf, not anyvar : value
          location: locationcapture //keydesbkn : keydesfn: mealtype :1;//idk yr
        }

        axios({
            method: 'POST', //post api, therefore use data variable to get sort, lcost , hcost
            url: 'http://localhost:4567/filter',
            headers: { 'Content-Type': 'application/json' },
            data : filterObj  //passing filterobj as input of APi - (WIT -  INPUT IS DATA)
        })
            .then(response => {
                this.setState({ restaurants_SV: response.data.restaurants, location_VS : locationcapture }) //sV :respoweb {getting expected resp as restaurants}
            })
            .catch()
    }

    handleNavigate = (restaurantIDE) =>
    {
        this.props.history.push(`/details?restaurant=${restaurantIDE}`);
        return(
            <div>
                tesing details
            </div>
        )
    }

    
    
render()
     {
        const{restaurants_SV , locations_SV} = this.state;
        return(
<div >

    
<div id="myId" className="heading">♏MealsMagic</div>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                
                   
                        <span className="text-style filter">Filters / Sort</span>
                        <hr/>
                        <span className="fas fa-angle-double-down icon" data-bs-toggle="collapse"
                            data-bs-target="#target"></span>
                        <div id="filter" className="collapse show">
                        <div className="text-style filter">Select Location</div>

                                    <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                        <option value="0">Select</option>
                                        {locations_SV.map((item) => {
                                            return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                        })}
                                    </select>
                <hr/>
                            <div className="text-style filter">Type</div>
                            <div>
                                <input type="checkbox" />
                                <span className="checkbox-items">North Indian</span>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <span className="checkbox-items">South Indian</span>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <span className="checkbox-items">Chineese</span>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <span className="checkbox-items">Fast Food</span>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <span className="checkbox-items">Street Food</span>
                            </div>

       <hr/>                    
                            <div className="text-style filter">Cost For Two</div>



                            <div>
                                <input type="radio" name="cost" />
                                <span className="checkbox-items">Less than &#8377;500</span>
                            </div>
                            <div>
                                <input type="radio" name="cost" />
                                <span className="checkbox-items">&#8377;500 to &#8377;1000</span>
                            </div>
                            <div>
                                <input type="radio" name="cost" />
                                <span className="checkbox-items">&#8377;1000 to &#8377;1500</span>
                            </div>
                            <div>
                                <input type="radio" name="cost" />
                                <span className="checkbox-items">&#8377;1500 to &#8377;2000</span>
                            </div>
                            <div>
                                <input type="radio" name="cost" />
                                <span className="checkbox-items">&#8377;2000 +</span>
                            </div>
            <hr/>      
                            <div className="text-style filter">Sort</div>
                            <div>
                                <input type="radio" name="sort" />
                                <span className="checkbox-items">Price low to high</span>
                            </div>
                            <div>
                                <input type="radio" name="sort" />
                                <span className="checkbox-items">Price high to low</span>
                            </div>
                        </div>
                    
                
            </div>


    <div className="col-sm-8 col-md-8 col-lg-8 ">
        {restaurants_SV.length > 0 ? restaurants_SV.map(item => {
            return <div className="Item" onClick={() => this.handleNavigate(item._id)}>
                    <div>      
                        <div className = "small-item vertical">
                            <img className="img" src={`./${item.image}`} alt='somename' />
                        </div>

                        <div className="big-item">
                            <div className="rest-name">{item.name}</div> {/*item.respoweb_keys or mgodata*/}
                            <div className="rest-location">{item.locality}</div>
                            <div className="rest-address">{item.city}</div>
                        </div>
                    </div>
                        <hr />

                        <div className="margin-left"> 
                            <div className="Bakery">★★★★★</div>
                        </div>
                       
             </div>}) :<div className='no-records'>No records found </div>}
{/* 

                <div className="item">
                    <div className="right-box-picture">
                        <img className="image-details" src='./Assets/breakfast.jpg' alt='randomname2'/>
                    </div>
                    <div className="right-box-details">
                        <div className="item-heading">The Big Chill Cakery</div>
                        <div >FORT</div>
                        <div>Shalimar Bagh, Delhi</div>
                    </div>
                    <hr />
                </div> */}


                
             {restaurants_SV.length >0 ?
                <div className="pagination">
                    <span className="fas fa-hand-point-left page"></span>
                    <span className="page-num">1</span>
                    <span className="page-num">2</span>
                    <span className="page-num">3</span>
                    <span className="page-num">4</span>
                    <span className="page-num">5</span>
                    <span className="fas fa-hand-point-right page"></span>
                </div> : null}
            </div>
        </div>
    </div>
</div>
        )
     }
}

export default Filter;