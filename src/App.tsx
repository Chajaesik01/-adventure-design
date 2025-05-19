import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mobile from './pages/mobile/Mobile';
import Pc from './pages/pc/Pc';
import { ToastContainer } from 'react-toastify';

function App() {
 
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Mobile/>}></Route>
          <Route path = "/mobile" element = {<Mobile/>}></Route>
          <Route path = "/pc" element = {<Pc/>}></Route> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
