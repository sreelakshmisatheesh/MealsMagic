const { response } = require('express');
const Items = require('../Models/Items');

exports.getMenuItemsByResId = (req , res ) =>
{
    const resVarId = req.params.resId;
   Items.find( {restaurantId : resVarId })
   .then( response => 
   {
      res.status(200).json(
        {
            message : "List of items found successfully",
            locations : response
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