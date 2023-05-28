const Users = require('../Models/Users');
//NO OBJECT DESTRUCTURING
exports.userLogin = (req , res ) =>
{
    //const locationID =  req.params.locationlinkID; since input not passing into url , taking separately
    const name = req.body.email;
    const pwd = req.body.password;
    let isAuthenticated, message;

    Users.find({ email : name ,
                 password : pwd })  //db,s key name : codeConst

   .then( response => 
   {
    if (response.length == 0) {
        isAuthenticated = false;
        message = "User Not Authenticated"
    }
    else {
        isAuthenticated = true;
        message = "User Authenticated"
    }

    //find returns an array here. length = 0, no such user exists
      res.status(200).json(
        {
            message , isAuthenticated, 
            user : response
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

// OBJECT DESTRUCTURING
exports.userLogin = (req , res ) =>
{
    //const locationID =  req.params.locationlinkID; since input not passing into url , taking separately
    const name = req.body.email;  //to take input
    const pwd = req.body.password;
    let isAuthenticated, message;

    Users.find({ email : name ,
                 password : pwd })  //dbs key name : codeConst

   .then( response => 
   {
    if (response.length == 0) {
        isAuthenticated = false;
        message = "User Not Authenticated"
    }
    else {
        isAuthenticated = true;
        message = "User Authenticated"
    }

    //find returns an array here. length = 0, no such user exists
      res.status(200).json(
        {
            message , isAuthenticated, 
            user : response
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


exports.userSignUp = (req, res) => 
{  //syntax to save:=
    const { email, password, firstname, lastname } = req.body;

    let userObj = new Users({
        email, password, firstname, lastname
    })

    userObj.save()
    .then(response => {
        res.status(200).json(
            {
                message: "User SignedUp Succesfully",
                user: response
            })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}
