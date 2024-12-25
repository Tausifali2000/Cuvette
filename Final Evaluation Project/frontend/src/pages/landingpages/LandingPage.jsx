
import landingStyle from "./cssModules/landing.module.css";
import { Link } from 'react-router-dom';


const LandingPage = () => {

 

  return (
    <>
    <div className={landingStyle.landingbody}></div>
    <header>
      <div className={landingStyle.title}> 
        <div><img src="/Link.png" /></div>
        <h1>FormBot</h1>
      </div>
      <div className={landingStyle.headers}>
      <Link to="/login">
        <button>Sign in</button>
        <button>Create a FormBot</button>
        </Link>
      </div>
    </header>

    <div className={landingStyle.body}>
      <div>
          <h2>Build advanced chatbots
          visually</h2>
          <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them
          anywhere on your web/mobile apps and start collecting results like magic.</p>
          <img src="/image.png" alt="" />
         <Link to="/login"> <button>Create a FormBot for free</button></Link>
      </div>
    </div>

    <footer>
      Hello
    </footer>
    </>
  )
}

export default LandingPage