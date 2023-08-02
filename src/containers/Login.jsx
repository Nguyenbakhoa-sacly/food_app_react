

import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginBg, logo } from '../assets/index'
import { validateUserJWTToken } from '../api/index'
import { LoginInput } from '../components'
import {
  AiOutlineMail,
  AiOutlineUnlock,
  FcGoogle
} from '../assets/icons'
import { buttonClick } from '../animations';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../config/firebase.config'
import { setUserDetails } from '../context/actions/userActions'
const Login = () => {
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider();

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user])
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider)
      .then(userCred => {
        firebaseAuth.onAuthStateChanged(cred => {
          if (cred) {
            cred.getIdToken().then(token => {
              console.log(token);
              validateUserJWTToken(token).then(data => {
                // console.log(data);
                dispatch(setUserDetails(data))
              })
              navigate('/', { replace: true });
            })
          }
        })
      })
  }

  //sign Up
  const signUpWithEmailPass = async () => {
    setUserEmail('')
    setPassword('')
    setConfirmPassword('')
    if (userEmail === '' || password === '' || confirmPassword === '') {
      alert('Please enter your')
    } else {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password)
          .then(userCred => {
            firebaseAuth.onAuthStateChanged(cred => {
              if (cred) {
                cred.getIdToken().then(token => {
                  console.log(token);
                  validateUserJWTToken(token).then((data) => {
                    dispatch(setUserDetails(data))
                  })
                  navigate('/', { replace: true });
                })
              }
            })
          })
      } else {
        //alert message
      }
    }
  }

  //sign In
  const signInWithEmailPass = async () => {
    if (userEmail !== '' && password !== '') {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password)
        .then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then(token => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data))

                })
                navigate('/', { replace: true });
              })
            }
          })
        })
    } else {

    }
  }


  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
      <img
        className='w-full h-full object-cover absolute top-0 left-0'
        src={loginBg}
        alt='login'
      />
      <div className='flex flex-col items-center bg-cardOverlay w-[80%] md:w-460 h-full z-10 backdrop-blur-md p-4 px-4 py-12 grap-6'>

        <div className='flex items-center justify-start grap-4 w-full'>
          <img
            src={logo}
            className='w-8 '
            alt=''
          />
          <p className='text-headingColor font-semibold text-2xl'>City</p>

        </div>

        <p className='text-2xl font-semibold text-headingColor '>Welcome Back</p>
        <p className='text-l text-textColor  -mt-1'>{isSignUp ? 'Sign Up' : 'Sign In'} with following </p>

        <div className='w-full flex flex-col items-center justify-center grap-6 px-4 md:px-12 py-4'>
          <LoginInput
            placeHolder={'Email here'}
            icon={<AiOutlineMail className='text-xl text-textColor' />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type='email'
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder={'Password here'}
            icon={<AiOutlineUnlock className='text-xl text-textColor' />}
            inputState={password}
            inputStateFunc={setPassword}
            type='password'
            isSignUp={isSignUp}
          />
          {
            isSignUp &&
            <LoginInput
              placeHolder={'Confirm Password'}
              icon={<AiOutlineUnlock className='text-xl text-textColor' />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              type='password'
              isSignUp={isSignUp}
            />
          }
          {
            !isSignUp ? (
              <p className='mb-4'>
                Already have an account :{' '}
                <motion.button {...buttonClick}
                  onClick={() => setIsSignUp(true)}
                  className='text-red-400 underline cursor-pointer bg-transparent ' >
                  Create one
                </motion.button>
              </p>
            )
              :
              (
                <p className='mb-4'>
                  Already have an account :{' '}
                  <motion.button {...buttonClick}
                    onClick={() => setIsSignUp(false)}
                    className='text-red-400 underline cursor-pointer bg-transparent ' >
                    Sign-in here
                  </motion.button>
                </p>
              )
          }

          {/*button submit**/}

          {isSignUp ? (
            <motion.button
              {...buttonClick}
              onClick={signUpWithEmailPass}
              className='w-full px-4 py-2 rounded-md
                            bg-red-400 cursor-pointer text-white text-xl
                            hover:bg-red-500 transition-all  duration-150
                        '
            >
              Sign Up
            </motion.button>

          )
            :
            (

              <motion.button
                {...buttonClick}
                onClick={signInWithEmailPass}
                className='w-full px-4 py-2 rounded-md
                            bg-red-400 cursor-pointer text-white text-xl
                            hover:bg-red-500 transition-all  duration-150
                        '
              >
                Sign In
              </motion.button>
            )
          }
        </div>
        <div className='flex items-center justify-between gap-16'>
          <div className='w-24 h-[1px] rounded-md bg-white'></div>
          <p className='text-white '>or</p>
          <div className='w-24 h-[1px] rounded-md bg-white'></div>
        </div>

        <motion.div {...buttonClick}
          onClick={loginWithGoogle}
          className='flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md
                cursor-pointer rounded-3xl'
        >
          <FcGoogle className='text-2xl' />
          <p className='capitalize text-base text-headingColor pl-2'>Signin With Google</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login