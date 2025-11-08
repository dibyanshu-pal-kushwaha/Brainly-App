import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef } from "react"
import { BACKEDNED_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEDNED_URL}/api/v1/signup` ,{
                username ,
                password
            
        })
        navigate("/signin");
        alert("You have signed up locally!")}
        
    

    return (
        <div className =" h-screen w-screen items-center flex justify-center  bg-gray-200">
            <div className ="min-w-48 p-8  bg-white rounded-xl ">
                <Input placeholder={"Username"}  ref={usernameRef}/>
                <Input placeholder={"Password"} ref={passwordRef}/>
                <div className ="flex justify-center items-center ">
                    <Button  onClick ={signup} variant ={"primary"} loading ={false} text={"Signup"} size={"md"} fullwidth ={ true}  />
                </div>
            </div>
            
        </div>
    )
}

// import { Input } from "../components/Input";
// import { Button } from "../components/Button";
// import { useRef } from "react";
// import { BACKEDNED_URL } from "../config";
// import axios from "axios";

// export function Signup() {
//     const usernameRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);

//     async function signup() {
//         const username = usernameRef.current?.value?.trim();
//         const password = passwordRef.current?.value?.trim();

//         if (!username || !password) {
//             alert("Please enter both username and password");
//             return;
//         }

//         try {
//             const res = await axios.post(
//                 `${BACKEDNED_URL}/api/v1/signup`,
//                 { username, password },
//                 {
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );
//             console.log("Server Response:", res.data);
//             alert("You have signed up locally!");
//         } catch (e: any) {
//             console.error("Signup error details:", e.response?.data || e.message);
//             alert("Signup failed: " + (e.response?.data?.message || e.message));
//         }
//     }

//     return (
//         <div className="h-screen w-screen items-center flex justify-center bg-gray-200">
//             <div className="min-w-48 p-8 bg-white rounded-xl">
//                 <Input placeholder="Username" ref={usernameRef} />
//                 <Input placeholder="Password" ref={passwordRef} />
//                 <div className="flex justify-center items-center">
//                     <Button
//                         onClick={signup}
//                         variant="primary"
//                         loading={false}
//                         text="Signup"
//                         size="md"
//                         fullwidth={true}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }
