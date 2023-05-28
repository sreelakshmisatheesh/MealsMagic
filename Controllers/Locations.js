const { response } = require('express');
const Locations = require('../Models/Locations');

exports.getLocations = (req , res ) =>
{
   Locations.find()
   .then( response => 
   {
      res.status(200).json(
        {
            message : "Location found successfully",
            locationsVS : response
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
//keys are message , locations , error