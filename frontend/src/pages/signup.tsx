import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div className="col-span-1 h-screen flex items-center justify-center">
        <Auth str="signup" />
      </div>

      <div className=" col-span-1 hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
