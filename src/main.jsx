import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import Nivelation from './pages/nivelation.jsx'
import PropertyShowcase from './pages/propertyShowcase.jsx'
import Calculator from './pages/calculator.jsx'
import Analyzer from './pages/analyzer.jsx'
import Resources from './pages/resources.jsx'
import HouseDetailComponent from './components/houseDetailComponent.jsx'
import ResourceDetailComponent from './components/resourceDetailComponent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
    <Header />
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/nivelation' element={<Nivelation />}></Route>
        <Route path='/showcase' element={<PropertyShowcase />}></Route> 
        <Route path='/calculator' element={<Calculator />}></Route>
        <Route path='/analyzer' element={<Analyzer />}></Route>
        <Route path='/resources' element={<Resources />}></Route>
        <Route path='/property/:id' element={<HouseDetailComponent/>}></Route>
        <Route path='/resources/:id' element={<ResourceDetailComponent/>}></Route>
      </Routes>
    <Footer />
    </Router>
)
