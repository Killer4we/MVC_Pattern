import {react} from 'react';
import './App.css'
import { Link, Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateListing from './pages/CreateListing';
import Product from './pages/Product';

function App() {
  return(
    <div>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/createListing' element = {<CreateListing/>}/>
          <Route path = '/product/:id' element={<Product/>}/>
        </Routes>
        
    </div>
  )
}

export default App
