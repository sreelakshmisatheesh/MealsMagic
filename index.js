const express = require('express');


const route = express.Router();
//app inu pakaram route.aakanm
//cout all apis from app.js here

//const studentController = require('./Students'); //imported getstudent method from studnet.js

/* route.use('/restaurants/:usercity', (req , resp) => {
    const input = req.params.usercity; //usercity aanu input edukkunna variavble of api , params is the function
    const filteredResponse = restaurants.filter(item => item.city == input);
    resp.status(200).json(filteredResponse); //.JSON for to avoid stringify
    //resp.status(200).json(students);
}); */

//const citiesController = require('./Students');
const restaurantController = require('./Controllers/Restaurant');
const locationController = require('./Controllers/Locations');
const mealtypesController = require('./Controllers/MealTypes');
const userController = require('./Controllers/Users');
const menuItemsController = require('./Controllers/Items');
const ordersController = require('./Controllers/SaveOrder');
const paymentGatewayController = require('./Controllers/Payments');



route.get('/locations' , locationController.getLocations );
route.get('/restaurants/:locationlinkID' , restaurantController.getRestaurantByLocation );
route.get('/mealtypes' , mealtypesController.getMealTypes);
route.post('/login', userController.userLogin);
route.post('/signup', userController.userSignUp);
route.get('/restaurant/:resId', restaurantController.getRestaurantDetailsById);
route.get('/menuitems/:resId', menuItemsController.getMenuItemsByResId);
route.get('/orders/:userId', ordersController.getOrdersByUserId); //already ordered item to display
route.post('/order', ordersController.toSaveOrderDetails); // going to order ie  adding to db , adding = post
route.post('/filter', restaurantController.restaurantFilter);
route.post('/payment', paymentGatewayController.payment);
route.post('/callback', paymentGatewayController.callback);

module.exports = route;