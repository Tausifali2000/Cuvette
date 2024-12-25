import React from 'react'
import HomeScreen from './userpages/HomeScreen'
import LandingPage from './landingpages/landingpage'

const Home = () => {
  const user = true; //checking if user is logged in or not
  return (
    <div>
      {user ? <HomeScreen /> : <HomeScreen />}; //rending page accordingly
    </div>
  )
}

export default Home
