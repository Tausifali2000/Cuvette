import signupStyle from "./cssModules/login.module.css";
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authUser';
import { useState } from "react";

const Signup = () => {

   const [username,setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { signup } = useAuthStore();

    const handleSignup = (e) => {
      e.preventDefault();
      console.log(username, email, password);
      signup({username, email, password});
    }
    
  
  return (
    <>
    
    <div className={signupStyle.backbutton}><img src="/arrow_back.png" /></div>
    <div className={signupStyle.formcontainer}>
      <form onSubmit={handleSignup}>
        <div>
        <label htmlFor="username">Username</label>
        <input 
            type="text"
            placeholder='Enter a username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
          
        <div>
        <label htmlFor="email">Email</label>
        <input 
            type="email"
            placeholder='Enter a email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
       
       <div>
       <label htmlFor="password">Password</label>
        <input 
            type="password"
            placeholder='******'
            />
          
         
        </div>
        
        <div>
        <label htmlFor="cpassword">Confirm Password</label>
        <input 
            type="password"
            placeholder='******'
            id='cpassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        
      
       
        <button type='submit'>Signup</button>
       
      </form>
      <p>Already have an account?</p>
      <Link to='/login' > <p>login</p></Link>
    </div>
    </>
  )
}

export default Signup