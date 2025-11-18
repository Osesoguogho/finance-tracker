import { useState } from "react";
import Modal from "./Modal";
import { MdOutlineVerticalShadesClosed } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
const apiUrl = import.meta.env.VITE_API_URL;

const Expenditure = ({expense, setExpenses}) => {
  const [isEdited, setIsEdited] = useState(false);
  const handleDelete = async() => {
    const response = await fetch(`${apiUrl}/api/expense/${expense._id}`,
      {
        method: "DELETE"
      }
    )
    if ( response.status == 201) {
      setExpenses((prev)=>{
       return prev.filter((ex)=> {
          return ex._id !== expense._id
        } )
      })
      // window.location = "/"
    }
  }

  return (
    <div>
        <div className='flex flex-wrap my-2 bg-slate-900 '>
        <div className='m-2 p-1 bg-slate-900 '><span className="text-justify font-bold text-blue-600">Category:</span> {expense.category}</div>
        <div className='m-2 p-1 bg-slate-900 '><span className="text-justify font-bold text-ellipsis text-blue-600">Description:</span> {expense.description}</div>
        <div className='m-2 p-1 bg-slate-900 '><span className="text-justify font-bold text-ellipsis text-blue-600">Payment Mode:</span> {expense.payment_method}</div>
        <div className='m-2 p-1 bg-slate-900 '><span className="text-justify font-bold text-ellipsis text-blue-600">Amount:</span> {expense.amount}</div>
        <div className='m-2 p-1 bg-slate-900 '><span className="text-justify font-bold text-ellipsis text-blue-600">Date:</span> {new Date(expense.createdAt).toLocaleDateString()}</div>
        <button onClick={() => setIsEdited(!isEdited)} className='m-2 p-1 rounded-md'><CiEdit /></button>
        <button onClick={handleDelete} className='m-2 p-1 rounded-md'><MdOutlineVerticalShadesClosed /></button>
        </div>
        {isEdited && <Modal expense={expense} setIsEdited={setIsEdited}/> }

    </div>
  )
}

export default Expenditure