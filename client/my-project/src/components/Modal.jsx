import React, {useState} from 'react';
import {jwtDecode} from "jwt-decode";

const Modal = ({expense, setIsEdited}) => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

 const [input, setInput] = useState({
 description: expense.description,
 amount: expense.amount,
 category: expense.category,
 payment_method: expense.payment_method,
 user_id: decoded.id,
 name: decoded.name
 });
 const[error, setError] = useState("");

 const handleChange = (event) => {
    const {name, value} = event.target;
    setInput({...input, [name]: value})
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    // const Token = localStorage.getItem('token')
    try {
      const response = await fetch(
        `http://localhost:3100/api/expense/${expense._id}`,
        {
          method: "PATCH",
          headers: {
            // Authorize: Token,
             "Content-type": "application/json",
             },
          body: JSON.stringify(input)
        }
      );
      if (!response.ok) {
        throw new Error("fail to send expenses")
      }
     const data = await response.json();
     setIsEdited(false)
     window.location= "/"

    
    } catch (err) {
      console.error(err.message);
      setError(err.message)
} finally{
  // setInput({
  //   description: "",
  //   amount: undefined,
  //   category: "",
  //   Payment_method: "",
  //   user_id: decoded.id,
  //   name: decoded.name
  //   });
}
  };


  return (
    <div className="flex flex-col justify-center text-center bg-teal-700 rounded-3xl shadow-2xl">
        <div className=" text-center">
            <div className="relative ">
                <h2 className='text-3xl text-center'>Edit Expenses</h2>
                <button onClick={ () => setIsEdited(false)} className=' bg-red-200 w-6 mt-5 px-6 text-center py-0 rounded-full top-0 right-1 absolute' >X</button>
            </div>
            <div className="">
            <form className="">
                <div className="my-4">
                    <label htmlFor='description'>Description: </label> <br/>
                    <input className="border-2 border-black rounded-xl w-full md:w-[500px] text-center text-black" type="text" name="description" value={input.description} onChange={handleChange} required/>
                </div>
                <div className="my-4">
                    <label htmlFor='amount'>Amount: </label> <br/>
                    <input className="border-2 border-black rounded-xl w-full md:w-[500px] text-center text-black" type='number' name='amount' value={input.amount} onChange={handleChange} required/>
                </div>
                <div className="my-4">
                    <label htmlFor='category'>Category: </label> <br/>
                    <select className="border-2 border-black rounded-xl w-full md:w-[500px] text-center text-black" name="category" value={input.category} onChange={handleChange} required>
                        <option value=""> Select a Category</option>
                        <option value="food">Food</option>
                        <option value="rent">Rent</option>
                        <option value="salary">Salary</option>
                        <option value="utilities">Utilities</option>
                        <option value="entaertainment"> Entertainment</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="my-4">
                    <label htmlFor='paymentMethod'>Payment Method: </label><br/>
                    <select className="border-2 border-black rounded-xl w-full md:w-[500px] text-center text-black" name="payment_method" value={input.payment_method} onChange={handleChange} required>
                        <option value=""> Select a Payment Method</option>
                        <option value="Credit Card">Credit card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <div><button className="my-5 bg-emerald-500 px-3 rounded-xl w-full md:w-[500px]" onClick={handleSubmit}>Submit</button></div>
                </form>
                </div>
                {error? <p>{error}</p>: ""}
        </div>
    </div>
  )
  
}

export default Modal