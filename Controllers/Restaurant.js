const { response } = require('express');
const Restaurants = require('../Models/Restaurant')
/*exports.getRestaurantByCity = ( ) =>
{

}*/

exports.getRestaurantByLocation  = (req , res ) =>
{
    const locationID =  req.params.locationlinkID;
    Restaurants.find({ location_id  : locationID })  //db,s key name : codeConst

   .then( response => 
   {
      res.status(200).json(
        {
            message : "restaurants found succesffulyy",
            restaurant : response
        }
      )
   })
   .catch( err => 
    {
        res.status(500).json(
            {
                error : err
            }
        )
    })
}

exports.getRestaurantDetailsById = (req, res) => 
{
    const resId = req.params.resId;

    Restaurants.findById(resId)
        .then(response => {
            res.status(200).json(
                {
                    message: "Restaurant Fetched Succesfully",
                    restaurant: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

//method for which, we cannot compell the user to put all of the input parameters of second page like sort , highcost etc
exports.restaurantFilter = (req , res ) =>
{
    let { mealtype, location, cuisine, lcost, hcost, sort, page} = req.body;  //declaring-object destructuring

    let filterObj = {}; //cannot comepell the user to input fullpr
    sort = sort ? sort : 1;
    page = page ? page : 1;

    const ItemsPerPage = 2;
    let startIndex = ItemsPerPage * page - ItemsPerPage;
    let endIndex = ItemsPerPage * page + 1;

    mealtype && (filterObj['mealtype_id'] = mealtype);
    location && (filterObj['location_id'] = location);
    cuisine && (filterObj['cuisine_id'] = { $in: cuisine }); //cuisine is an array
    lcost && hcost && (filterObj['min_price'] = { $lte: hcost, $gte: lcost }); //$- range / not sure




    Restaurants.find(filterObj).sort({ min_price: sort })
        .then(response => {

            // Pagination Logic

            const paginatedResponse = response.slice(startIndex, endIndex); 

            res.status(200).json(
                {
                    message: "Restaurants Fetched Succesfully",
                    restaurants: paginatedResponse,
                    pageCount: Math.ceil(response.length / ItemsPerPage),
                    currentPage: page
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}