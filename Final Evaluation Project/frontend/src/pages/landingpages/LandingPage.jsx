


import landingStyle from "./cssModules/landing.module.css";
import { Link } from 'react-router-dom';



const LandingPage = () => {

   
  return (
    <>
    <div className={landingStyle.landingbody}></div>
    <header className={landingStyle.header}>
      <div className={landingStyle.title}> 
        <div><img src="/SVG.png" /></div>
        <h1>FormBot</h1>
      </div>
      <div className={landingStyle.headbtn}>
      <Link to="/login">
        <button>Sign in</button>
        <button>Create a FormBot</button>
        </Link>
      </div>
    </header>

    <div className={landingStyle.body}>
      <div className={landingStyle.bodyContent}>
          <h2>Build advanced chatbots
          visually</h2>
          <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them
          anywhere on your web/mobile apps and start collecting results like magic.</p>
          <Link to="/login"> <button>Create a FormBot for free</button></Link>
          <img src="/image.png" alt="" />
        
      </div>
    </div>
      
    <footer className={landingStyle.footer}>
    <div className={landingStyle.footerContent}>
          <div className={landingStyle.footerSection}>
            <h3>FormBot</h3>
            <p>Made with ❤️ by [Your Team]</p>
          </div>
          <div className={landingStyle.footerSection}>
            <h3>Product</h3>
            <ul>
              <li>Status</li>
              <li>Documentation</li>
              <li>Roadmap</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className={landingStyle.footerSection}>
            <h3>Community</h3>
            <ul>
              <li><a >Discord</a></li>
              <li><a >GitHub</a></li>
              <li><a >Twitter</a></li>
              <li><a >LinkedIn</a></li>
            </ul>
          </div>
          <div className={landingStyle.footerSection}>
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Contact</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <p className={landingStyle.footerBottom}>
          © 2024 FormBot. All rights reserved.
        </p>
    </footer>
    </>
  )
}

export default LandingPage