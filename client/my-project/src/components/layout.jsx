import { NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Layout({setAuth}) {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#ed0e0e"
    };

    return (
        <div>
        <nav className="host-nav h-10rem bg-[#1A3636] flex justify-between align-center p-6 text-slate-100"  >
           
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
        <button className="bg-red-600 rounded-xl p-3" onClick={ () => {localStorage.removeItem("token");
            setAuth(false)
        }}>X</button>
            </div>
       </nav>
       <main className="bg-[#40534C] grow">
        <Outlet />
        </main>
        <footer className="bg-[#e2dad6]">
            <Footer/>
        </footer>
        </div> 
        )
}
