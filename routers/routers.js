const express = require('express');
const router = express.Router()
module.exports = router;


const UserModel = require('../model/user/user.model');
const userModel = require('../model/user/user.model');
// const userModel = require('../model/user/user.model');


//Post Method
router.post('/user', (req, res) => {
    try {
        console.log(req.body)
        const user = new UserModel(
            // name: req.body.name,
            // email: req.body.email,
            // password: req.body.password,
            req.body
        );
         
        const dataToSave = user.save();
        res.send(dataToSave)
    }
    catch (error) {
        //throw new Error(error.message)
        console.log('error===', error)
        res.status(400).send({message: error.message})
    };


})

//Get all Method
router.get('/user', async (req, res) => {
    try{
        const data = await UserModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
//Write code for fetch user by ID
router.get('/user/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await UserModel.findById(id);
        if(!data){
            throw new Error("User not found");
        }
        res.send(data);
        
    } catch (error) {
        throw new Error(error);
    }
})

//update by email ID
router.post("/userByEmail",async (req,res)=>{
    try {
        // const id=req.query.id;
        const email = req.body.email
        const data = await UserModel.findOne({email})
        if (!data) {
            throw new Error("Data Not Found")
        }
        res.send(data);
        
    } catch (error) {
        throw new Error(error);
    }

})

router.delete("/user/:id", async(req, res) =>{
    try {
        console.log("123")
        const id = req.params.id;
        const result = await UserModel.findByIdAndDelete({_id : id});
        res.send({message: "Record deleted successfully!"})
    } catch (error) {
        throw new Error(error);
    }
})

//Update by ID Method
router.put('/user', async(req, res) => {
    try{
        const { id, phoneNumber, location } = req.body;
        const data = await UserModel.findById(id);
        if (!data){
            throw new Error("Please check the ID")
        }
        data.phoneNumber = phoneNumber;
        data.location = location;
        // data.location.address = location.address;
        // data.location.city = location.city;
        // data.location.state = location.state;
        // data.location.country = location.country;
        // data.location.zipCode = location.zipCode
        data.save();
        res.send({message:"Phone number updated successfully"})
    }
    catch(err){
        throw new Error(err)
        //res.status(500).json({message: err})
    }
    //res.send('Update by ID API')
})

//Find and Update Query
router.put("/user1", async(req,res) =>{
    try {
        const {id, location} = req.body;

        await userModel.findOneAndUpdate({_id: id}, {"location.address": location.address}
        ,{returnDocument: 'after'}).then((data) => {
                console.log('update oauth token to DB finished!', data);
                res.send(data);
           })
           .catch(err => {
                console.log('update oauth token error:', err);
                throw new Error(err);
           });


        // const data = await userModel.findByIdAndUpdate(id, location)
        // .then((data)=>{

            
            
        // }).catch(err){
        //     throw new Error(err)
        // }
    } catch (error) {
        throw new Error(error);
    }
})


//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})