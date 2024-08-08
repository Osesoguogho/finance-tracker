import { useState } from "react";
import Modal from "./Modal";

const Expenditure = ({expense}) => {
  const [isEdited, setIsEdited] = useState(false);
  const handleDelete = async() => {
    const response = await fetch(`http://localhost:3100/api/expense/${expense._id}`,
      {
        method: "DELETE"
      }
    )
    if ( response.status == 201) {
      window.location = "/"
    }
  }

  return (
    <div>
        <div className='flex flex-wrap my-4'>
        <div className='m-2 p-1 bg-slate-900 '>Category: {expense.category}</div>
        <div className='m-2 p-1 bg-slate-900 '>Description: {expense.description}</div>
        <div className='m-2 p-1 bg-slate-900 '>Payment Method: {expense.payment_method}</div>
        <div className='m-2 p-1 bg-slate-900 '>Amount: {expense.amount}</div>
        <div className='m-2 p-1 bg-slate-900 '>Date: {expense.createdAt}</div>
        <button onClick={() => setIsEdited(!isEdited)} className='m-2 p-1 bg-yellow-500'>EDIT</button>
        <button onClick={handleDelete} className='m-2 p-1 bg-red-500'>DELETE</button>
        </div>
        {isEdited && <Modal expense={expense} setIsEdited={setIsEdited}/> }

    </div>
  )
}

export default Expenditure