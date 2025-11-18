const express = require("express");
const {users, expenses, purseMoney} = require("../model/usermodel");
const authorize = require("./middleware");

const router = express.Router();
// get route for expenses
router.get("/expense", authorize, async(req, res)=> {
 const idOfUser = res.user.id;
 console.log(idOfUser);
try {
    const currentUser = await expenses.find({user_id: idOfUser})
  if(!currentUser) return res.status(404).json({status: "U haven't made any expenses"});
  return res.json(currentUser);
} catch (error) {
    console.log(error);
    res.status(500).json("server error");
}
});
// post route expenses
router.post("/expense",  async(req, res)=> {
  const newExpense = req.body;
  console.log(newExpense);
  const {user_id} = newExpense;
//  const idOfUser = res.user.id;
//  const user_name = res.user.name;
 console.log(user_id);

 try {
  // const purse_balance = await purseMoney.findOne({user_id: user_id});
  // const userExpenses = {...newExpense, purseBalance: purse_balance._id};
  const currentExpense = await expenses.create(newExpense);
  console.log(currentExpense);


return res.status(201).json(currentExpense);
 } catch (error) {
  console.log(error.message);
  res.status(501).json({status: "server error", message: error.message});
 }
});
// update or edit route for expenses
router.patch("/expense/:id", async(req, res)=> {
  const id = req.params.id;
  console.log(id)
  const updateData = req.body;
  console.log(updateData)
 
  try {
   const updateExpense = await expenses.findByIdAndUpdate({_id: id},{$set: updateData}, {new:true});

   if (!updateExpense) return res.status(404).json("data not found");
 
 return res.status(201).json(updateExpense);
  } catch (error) {
   console.log(error.message);
   res.status(500).json({status: "server error", message: error.message});
  }
 });
 // delete route for expenses
 router.delete("/expense/:id", async(req, res)=> {
  const id = req.params.id;
  try {
    expenses.findByIdAndDelete(id).then(()=> res.status(201).json("deleted successfully"));

  } catch (error) {
    console.log(error.message);
    res.status(500).json({status: "server error", message: error.message});
  }
 });
// get route for purse balance
 router.get("/purse", authorize, async(req, res)=> {
  const idOfUser = res.user.id;
  const name = res.user.name;
  try {
    const user_details = await users.findOne({_id: idOfUser});
    const user_email = user_details.email;
    const userBalance = await purseMoney.findOne({email: user_email});
    if(!userBalance) return res.status(404).json(`no data found for ${name}`)
    return res.json(userBalance);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({status: "server error", message: error.message});
  }
 });
// post route for purse balance
 router.post("/purse", async(req, res)=> {

  const balance = req.body;
  try {
    // const newBalance = {user_id: id, purse_balance: balance};
    const purseBalance = await purseMoney.create(balance);
    if(!purseBalance) return res.status(404).json("data not found");

    return res.status(201).json({status: "success"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error});
  }
 });
 // update route for expenses
router.patch("/purse/:id", async(req, res)=> {
  const id = req.params.id;
  const balance = req.body;
  console.log(balance)
  // const idOfUser = res.user.id;
  try {
    // const newBalance = {user_id: idOfUser, purse_balance: balance};
    const purseBalance = await purseMoney.findByIdAndUpdate({_id: id}, {$set: balance}, {new:true});
    if(!purseBalance) return res.status(404).json("data not found")

    return res.json(purseBalance);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error});
  }
});

module.exports = router;