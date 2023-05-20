import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthProvider'
import ProtectedLayout from './components/ProtectedLayout'
import ProtectedCompanyLayout from './components/ProtectedCompanyLayout'
import ProfilePage from './pages/ProfilePage'
import Logout from './components/Logout'
import RegisterPage from './pages/RegisterPage'
import CreateCurriculumPage from './pages/CreateCurriculumPage'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage'
import CompanyPage from './pages/CompanyPage'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/logout' element={<Logout />} />
          <Route path='/curriculum' element={
            <ProtectedLayout>
              <CreateCurriculumPage />
            </ProtectedLayout>
          } />
          <Route path='/profile' element={
            <ProtectedLayout>
              <ProfilePage />
            </ProtectedLayout>
          } />
          <Route path='/company' element={
            <ProtectedCompanyLayout>
              <CompanyPage />
            </ProtectedCompanyLayout>
          } />
        </Routes>
      </AuthProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
