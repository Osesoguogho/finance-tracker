import React, {useState, useEffect} from 'react';
import Expenditure from '../components/expenditure';
import PostExpense from '../components/PostExpense';
const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
const [expenses, setExpenses] = useState([]);
const [purse, setPurse] = useState({});
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [budget, setBudget] = useState(false);
const [amount, setAmount] = useState(purse.purse_balance);
// const [balance, setBalance] = useState(null);


  async function mothlyExpense () {
  try {
setLoading(true);
 const Token = localStorage.getItem("token")
const [response1, response2] = await Promise.all( [fetch(`${apiUrl}/api/expense`, {
  headers: { Authorization: Token }
}),  fetch(`${apiUrl}/api/purse`, {
  headers: { Authorization: Token }
})
]);

if (!response1.ok || !response2.ok) {
 throw new Error("Error fetching data")
}
const [data1, data2] = await Promise.all([
  response1.json(),
  response2.json()
]);
setExpenses(data1);
setPurse(data2);
console.log(expenses);
console.log(purse);

} catch (error) {
    console.log(error.message);
    setError(error.message)
} finally{
  setLoading(false);
}
}

useEffect(() => {
  mothlyExpense();
}, []);

const expenditure = expenses.sort((a, b)=> a.createdAt - b.createdAt
)
console.log(expenditure);

const handleAmount = async(e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${apiUrl}/api/purse/${purse._id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({purse_balance: amount})
    });
     
    if(!res.ok) throw new Error("fail to update purse balance");
    const data = await res.json();
    console.log(data);
    setPurse(data);
    setBudget(false);
    // console.log(purse)

    
  } catch (error) {
    console.log(error.message);
  }
}
if(loading) return <div className='h-screen text-black'><h1>Loading.....</h1></div>;
if (error) return <p> Error: {error}</p>;

const totalAmount = expenses.reduce((quantity, items) => items.amount + quantity, 0);
const balanceAmount = purse.purse_balance - totalAmount

// useEffect( () =>{
// const totalAmount = expenses.reduce((quantity, items) => items.amount + quantity, 0);
// const balanceAmount = purse.purse_balance - totalAmount;
// setBalance(balanceAmount);
// console.log(balance);
// }, [purse, expenses]);

  return (
   
    <div className='flex flex-col justify-col mx-2'>
    <PostExpense expenses={expenses} setExpenses={setExpenses}/>
    <div className='flex justify-center items-center flex-col'>
     {purse && <p className='text-xl font-black'> Monthly Budget: &#8358;{purse.purse_balance} </p>}
     <p className='font-bold'> Money spent: &#8358;{totalAmount}</p>
     <p className='font-bold'> Balance: &#8358;{balanceAmount}</p>
     <button className='bg-yellow-900 px-2 my-2' onClick={() => setBudget(!budget)}>update budget</button>
     {budget && <div> <input className='text-center rounded-xl text-black border-black border-solid border-2' type='number' name='amount' value={amount} onChange={ (e) => setAmount(e.target.value)} /> <button className='bg-blue-600 rounded-xl px-3' onClick={handleAmount}>submit</button> </div>
     }
    </div>
      <div className='bg-[#f5f5f5] rounded-xl shadow-2xl text-white m-auto h-auto flex justify-center flex-col my-4' >
        {expenditure.map((expense) =>  ( <div key={expense._id}> <Expenditure expense={expense} setExpenses={setExpenses} /> </div>)) };
      </div>
    </div>
  )
};

export default Dashboard