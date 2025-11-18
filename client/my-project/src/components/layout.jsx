import { NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function Layout({setAuth}) {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = ()=> {
        setIsOpen(!isOpen);
    }
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "blue"
    };

    return (
        <div>
            <div>
        <nav className="host-nav h-10rem bg-[#1A3636]  justify-between hidden md:flex align-center p-6 text-slate-100"  >
           
           <NavLink
                to="."
                end 
              className= "m-3 font-extrabold"
            >
                Track your Expenses
            </NavLink>
            <div className="flex justify-between">
           <NavLink
                to="."
                end 
                style={({ isActive }) => isActive ? activeStyles : null}
                className="m-3"
            >
                Dashboard
            </NavLink>

            <NavLink
                to="login"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                login
            </NavLink>
            
            <NavLink
                to="register"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                Register
            </NavLink>
        <button className="text-red-600 rounded-xl" onClick={ () => {localStorage.removeItem("token");
            setAuth(false)
        }}>logout</button>
            </div>
       </nav>

      <nav className={`host-nav ${isOpen? "h-40rem":"h-10rem"} flex bg-[#1A3636]  justify-between md:hidden align-center p-6 text-slate-100` } >
           
           <NavLink
                to="."
                end 
              className= "m-3 font-extrabold"
            >
                Track your Expenses
            </NavLink>
          <div>
            {isOpen &&
            <div className="flex justify-between flex-col">
           <NavLink
                to="."
                end 
                style={({ isActive }) => isActive ? activeStyles : null}
                className="m-3"
            >
                Dashboard
            </NavLink>

            <NavLink
                to="login"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                login
            </NavLink>
            
            <NavLink
                to="register"
                style={({ isActive }) => isActive ? activeStyles : null}
                className= "m-3"
            >
                Register
            </NavLink>
        <button className="text-red-600 mr-6 " onClick={ () => {localStorage.removeItem("token");
            setAuth(false)
        }}>Logout</button>
            </div>
           }
           </div>
           <button onClick={handleOpen} className={`transition ${isOpen?"mb-32" : ""}`}>
            {isOpen? <IoMdClose /> : <GiHamburgerMenu />}
           </button>
       </nav>

      </div>

       <main className="bg-[#40534C] grow">
        <Outlet />
        </main>
        <footer className="bg-[#e2dad6]">
            <Footer/>
        </footer>
        </div> 
        )
}
