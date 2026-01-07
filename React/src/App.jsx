import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import ProfileLoader from './Pages/ProfileLoader/ProfileLoader'
import Onboarding from './Pages/Onboarding/Onboarding'
import Dashboard from './Pages/Dashboard/Dashboard'
import DBHome from './DashboardPages/DBHome/DBHome'
import DBProfile from './DashboardPages/DBProfile/DBProfile'
import DBLetters from './DashboardPages/DBLetters/DBLetters'
import DBSearch from './DashboardPages/DBSearch/DBSearch'
import DBWrite from './DashboardPages/DBWrite/DBWrite'

function App() {

  return (
    <>
      <div className="gradient-bg"/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/ProfileLoader" element={<ProfileLoader/>}/>
        <Route path="/Onboarding" element={<Onboarding/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}>
          <Route index element={<DBHome/>}/>
          <Route path="Profile/:username" element={<DBProfile/>}/>
          <Route path="Letters" element={<DBLetters/>}/>
          <Route path="Search" element={<DBSearch/>}/>
          <Route path="Write/:username" element={<DBWrite/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
