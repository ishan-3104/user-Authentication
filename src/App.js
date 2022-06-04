
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Signin from './components/signin';
import Login from './components/login';
import Welcome from './components/welcome';
import Proute from './components/proute';
import Display from './components/display';
import Galary from './components/galary';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>  
          <Route path='/signin' element={<Signin/>}/>  
          <Route path='/login' element={<Login/>}/>  
          <Route path='/welcome' element={<><Proute><Welcome/></Proute></>}/>  
          <Route path='/display' element={<><Proute><Display/></Proute></>}/>  
          <Route path='/galary' element={<><Proute><Galary/></Proute></>}/> 
          
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
