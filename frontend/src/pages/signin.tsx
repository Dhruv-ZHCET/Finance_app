
import { Auth2 } from "../components/Auth_signin"
import { Quote } from "../components/Quote"
export const Signin = () =>{
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div className="col-span-1 flex items-center justify-center">
                <Auth2 str="signin"/>
            </div>
            
            <div className=" col-span-1 hidden lg:block">
                <Quote />
            </div>
            
        </div>
        )
}