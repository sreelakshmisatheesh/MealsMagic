import React from "react";
import axios from 'axios';
import queryString from 'query-string';
import '../Styles/details.css';
import Modal from 'react-modal';

//Model custom style from React Model
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Details extends React.Component
{
    constructor() 
    {
        super();
        this.state = {
            myrestaurant: {},
            mymenuItems : [],
            
            menuItemsModalIsOpen: false,
            subTotal: 0


        }
    }

    // handleNavigate = (restaurantIDE) =>
    // {
    //     this.props.history.push(`/details?restaurant=${restaurantIDE}`);
    //     return(
    //         <div>
    //             tesing details
    //         </div>
    //     ) //tried
    // }

     componentDidMount()
     { 
         
        //which restaurant will the details page load 
        const qs = queryString.parse(this.props.location.search) //string -> object
        const{restaurant} = qs; //destructuring link variables
        //which restaurant will the details page load 
        axios({
            method: 'GET',
            url: `http://localhost:4567/restaurant/${restaurant}`,  //link passing and dst
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ myrestaurant: response.data.restaurant}) //statevariable : keyname@BNcode
            })
            .catch()
     }

     handleOrder = (resId) =>
      {
        axios({
            method: 'GET',
            url: `http://localhost:4567/menuitems/${resId}`,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ mymenuItems: response.data.menuItems, menuItemsModalIsOpen: true })
            })
            .catch()
      }  
      
      
    handleModal = (state, value) => {
        this.setState({ [state]: value })
    }


    render()
    {
        
        const { myrestaurant, menuItemsModalIsOpen, subTotal } = this.state;
        return (
            <div>
                <div>
                    <img src={`./${myrestaurant.image}`} alt="No Image, Sorry for the Inconvinience" width="100%" height="300px" />

                </div>
                <div className="heading">{myrestaurant.name}</div>
                <button className="btn-order" onClick={() => this.handleOrder(myrestaurant._id)}>Place Order</button>
 {/* ABOUT RESTAURANT */}
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" checked />
                        <label for="tab-1">Overview</label>

                        <div className="content">
                            <div className="head">Rating - 5 stars</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377; {myrestaurant.min_price} for two people(approx)</div>
                        </div>
                    </div>
 {/* CONTACT INFO */}
                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label for="tab-2">Contact</label>

                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{myrestaurant.contact_number}</div>
                            <div className="head">Address</div>
                            <div className="value">{`${myrestaurant.locality}, ${myrestaurant.city}`} {/* more details in one line from db , therefore concatenate */} </div> {}
                        </div>
                    </div>
                </div>
 {/* Model code from react */}
                <Modal
                    isOpen={menuItemsModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('menuItemsModalIsOpen', false)}></div>
                        <div >


                            <h3 className="heading">{myrestaurant.name}</h3>
                            <h3 className="heading">Thank you for checking us!</h3>

                        </div>
                    </div>
                </Modal>


            </div>
        )
    }
    
  }

export default Details;