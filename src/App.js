
import { Route, Routes } from 'react-router-dom'
import { Main, Login } from './containers/index'
import { validateUserJWTToken } from './api/index'
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setUserDetails } from './context/actions/userActions'
import { motion } from 'framer-motion'
import { fadeInOut } from './animations';
import { Loader } from './components';

function App() {
  const firebaseAuth = getAuth(app)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setIsLoading(true)
    firebaseAuth.onAuthStateChanged(cred => {
      if (cred) {
        cred.getIdToken().then(token => {
          console.log(token);
          validateUserJWTToken(token).then(data => {
            // console.log(data);
            dispatch(setUserDetails(data))
          })
        })
      }
      setInterval(() => {
        setIsLoading(false)
      }, 3000);
    })
  }, [])
  return (

    <div className='w-screen min-h-screen h-auto flex flex-col items-center justify-center'>
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className='fixed z-50 inset-0 bg-cardOverlay backdrop-blur-md flex items-center justify-center w-full '
        >
          <Loader />

        </motion.div>
      )}
      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
