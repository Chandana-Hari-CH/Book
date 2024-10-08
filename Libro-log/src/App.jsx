import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Add from './components/Add'
import Edit from './components/Edit.jsx'
import Header from './components/Header'
import View from './components/View.jsx'
function App() {

  return (
    <>
      <Header/>
      <Routes>
        
          <Route path='/' element={<Add/>}/>
          <Route path='/view' element={<View/>}/>
          <Route path="/edit/:id" element={<Edit />} />
          <Route path='/*' element={<Navigate to={'/'} />} />
          
        
      </Routes>
      
      
    </>
  )
}

export default App
