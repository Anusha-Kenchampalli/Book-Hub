import {Routes, Route} from 'react-router' 
import './App.css'
import Login  from './components/login/login.jsx' 
import Home from './components/home/Home.jsx' 
import BookshelvesAll from './components/BookshelvesAll/BookshelvesAll.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import BlogItem from './components/BlogItem/BlogItem.jsx' 
import PageNotFound from './components/PageNotFound/PageNotFound.jsx' 

const App=()=> { 
  

  return (
    <> 
 
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}   />
      <Route path="/bookshelves" element={<ProtectedRoute><BookshelvesAll/></ProtectedRoute>}/> 
      <Route path="/blogitem/:id/" element={<ProtectedRoute><BlogItem/></ProtectedRoute>}/> 
      <Route path="*" element={<ProtectedRoute><PageNotFound/></ProtectedRoute>}/>
     </Routes>
    </>
  )
}

export default App
