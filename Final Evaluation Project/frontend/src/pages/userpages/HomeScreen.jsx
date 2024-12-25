import { useState } from 'react'
import homestyles from './cssModules/home.module.css'

const HomeScreen = () => {

  const [ folderBox, setFolderBox] = useState(false);
  const [formDiv, setFormdiv] = useState(true);
  const [folderName, setFolderName] = useState('');

  function openFolderBox () {
    setFormdiv(false);
    setFolderBox(true);
    console.log(folderName);
  }
 
  function createFolder() {
    
  }

  return (
    <>
   <div className={homestyles.homebody}>
   <header className={homestyles.homeheader}>
   <div className={homestyles.dropdown}>Workspacename</div>
    <div className={homestyles.btn}>
    
    <div>light and dark</div>
    <button>Share</button>
    </div>
      
     
     </header>

     <div className={homestyles.container}>
      <div className={homestyles.workspace}>
      <div className={homestyles.foldernames}>
        <button onClick={openFolderBox}>Create a folder</button>
        <div className={homestyles.folders}>
            <button>Folder Name</button>
        </div>
        
      </div>
      <div className={homestyles.container0}>
        <div className={homestyles.createform}>Create a typebot</div>
        <div className={homestyles.forms}>
          
          {folderBox && (
          <div className={homestyles.folderbox}>
            <h1>Create New Folder </h1>
            <input 
                type="text" 
                placeholder='Enter folder name'
                onChange={(e) => setFolderName(e.target.value)}
                 />
            <div className={homestyles.folderboxbtn}>
              <button>Done</button>
              <button>Cancel</button>  
            </div>
          </div>
          )}
          
          {formDiv && (
          <div className={homestyles.form}>New form</div>
        )}
        </div>
      </div>
      </div>
     
      
     </div>
   </div>
    
    </>
  )
}

export default HomeScreen
