import { useState, ChangeEvent } from "react";
import axios from "axios";

export default function Login() {

  //useStates
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  // submit function
  const submit=async():Promise<void>=>{
    try{
 setLoading(true);

 const response=await axios.post(
"http://localhost:8080/signup",
{
   name, email, password
}
 );
  alert("User registered successfully");

    }catch(e:any){
console.log("login error",e.message)
    }finally{
      setLoading(false);
    }
  }

  
  return (
    <div className="min-h-screen  bg-[#FDECED] flex justify-center items-center px-4 py-10">
      <section className="max-w-md mx-auto w-full ">
        <div className="rounded-md bg-white shadow-md pb-6 overflow-hidden">
          <div>
            <img
              src="public\loginimg.png"
              alt="ApnaCollage img"
              className="h-48 w-full object-cover sm:h-56"
            />
          </div>
          <div className="max-w-xs mx-auto pt-12">
            <h1 className="text-xl mb-8 font-medium">
              Sign Up to view your profile
            </h1>
            <input
              type="text"
              placeholder="Name" onChange={(e)=>{setName(e.target.value)}}
              className="w-full h-8 border-blue-800 rounded-sm mb-4"
            ></input>
            <input
              type="email"
              placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}
              className="w-full h-8 border-blue-800 rounded-sm mb-4 "
            ></input>
            <input
              type="password"
              placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}
              className="w-full h-8 border-blue-800 rounded-sm mb-4"
            ></input>
            <button className="w-full bg-[#9F2089] text-white font-bold py-2 rounded-sm" onClick={submit}>
              Continue
            </button>
          </div>    
        </div>
      </section>
    </div>
  );
}
