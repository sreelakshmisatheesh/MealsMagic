const { response } = require('express');
const MealTypes = require('../Models/MealTypes')
/*exports.getMealTypes = ( ) =>
{

}*/

exports.getMealTypes = (req , res ) =>
{
    MealTypes.find()
   .then( response => 
   {
      res.status(200).json(
        {
            message : "MealTypes found succesffulyy",
            mealtypesVS : response
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