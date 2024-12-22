
import { useState } from 'react'
import signupStyle from "./cssModules/signup.module.css";
import { Link } from 'react-router-dom';

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log( email, password);
  }

return (
  <>
  
  <div className={signupStyle.backbutton}><img src="/arrow_back.png" /></div>
  <div className={signupStyle.formcontainer}>
    <form onSubmit={handleLogin}>
     
        
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        
       
      </div>
      
      
     
      
      
    
     
      <button type='onSubmit'>Login</button>
     
    </form>
    <p>Don't have an account?</p>
    <Link to='/signup' > <p>signup</p></Link>
  </div>
  </>
)
}

export default Login