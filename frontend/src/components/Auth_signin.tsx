import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Authprops {
    str  : string
}
export const Auth2 = ({str} : Authprops)=>{
    const navigate = useNavigate();

    return(
        <div className="text-center ">
            <div className= "font-bold text-4xl text-slate-200 ">
                  {str==='signup'?"Create an Account":"Sign into Your account" }
            </div>
            <div className="flex text-slate-400 mt-1 m-4 justify-center items-center">
                <div>{str==='signup'?"Already have an Account?":"Don't have an account?"} </div>                        
                <div className="p-2 underline underline-offset-1 onclick:text-slate-700"> {str==='signup'?"Signin":"Signup"}</div>  
            </div>
            <div className="text-slate-400"> 
                 <InputPlaceholder label="Email" placeholder="m@example.com" onchange={()=>{}}
                 />
                 <InputPlaceholder label="Password" type="password" placeholder="Enter password" onchange={()=>{}}
                 />
                 <div className="mt-10">
                 <button type="button" className="w-full text-white bg-slate-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                 onClick={()=>{
                    navigate('/dashboard');
                 }}>{str==='signup'?'Sign Up':'Sign in'}</button>
                 </div>
                 
            </div>
        </div>
    
    )
}
interface InputPlaceholdertype{  
    label : string; 
    placeholder : string;
    onchange : (e:ChangeEvent<HTMLInputElement>) => void 
    type? : string
}
function InputPlaceholder({label , placeholder , onchange, type } : InputPlaceholdertype){
    return (
        <div className="mt-4">
            <label  className="block mb-2 text-sm font-semibold text-slate-300  text-left">{label}</label>
            <input onChange = {onchange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}