import {Input} from "../components/Input";
import {Button} from "../components/Button";
import { useRef } from "react"
import { BACKEDNED_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEDNED_URL}/api/v1/signin` ,{
                username ,
                password
            
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
        navigate("/dashboard");
    }

    return (
        <div className =" h-screen w-screen items-center flex justify-center  bg-gray-200">
            <div className ="min-w-48 p-8 border-2 border-gray-200  bg-white rounded-xl shadow-md">
                <Input ref={usernameRef} placeholder={"Username"} />
                <Input ref={passwordRef} placeholder={"Password"}/>
                <div className ="flex justify-center items-center ">
                    <Button variant ={"primary"} loading ={false} text="Signin" size={"md"} fullwidth ={ true}  onClick={signin}/>
                </div>
            </div>            
        </div>
    )
}