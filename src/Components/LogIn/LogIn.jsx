import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const LogIn = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')

   const handleSignIn = e =>{
     e.preventDefault()
     const email = e.target.email.value
     const password = e.target.password.value
     console.log(email, password)
     setRegisterError('')
     setSuccess('')
     signInWithEmailAndPassword(auth, email, password)
     .then(result =>{
        console.log(result.user)
        // setSuccess('User log in successfully')
        // ekhane 1ta validation dite pari je emailVerify hole success na hole alert show korbe.and we can send a verification mail
        if(result.user.emailVerified){
            setSuccess('User log in successfully')
        }
        else{
            alert('Please verify your email address')
            sendEmailVerification(result.user)
                .then(() =>{
                    alert('Email Verification sent')
                })
        }
     })
     .catch(error =>{
        console.log(error)
        setRegisterError(error.message)
     })
   }
   // forget Password:
   /**
    * Problem ta hosse ekhane amra form ke submit korsi na, jokhon form er email,password input field gula submit kori then amra email password gula peye jai
    * etar solution 2ta :
    * 1. jokhon email take change kortesi tokhon 1ta state declare korte pari,jokhon onChange hobe tokhon state update kore feltesi and eta use korte pari
    * 2. ref use kore 
    * regex: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/ --jodi thik moto na hoy 
    */
   const emailRef = useRef(null)
   const handleForgetPassword = () =>{
        //validation
        const email = emailRef.current.value
        if(!email){
            console.log('Please provide an email', emailRef.current.value)
            return
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            console.log('Please write a valid email')
            return
        }
        //send validation email
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('please check your email')
        })
        .catch(error =>{
            console.log(error)
        })
   }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" 
                            name="email" 
                            ref={emailRef}
                            placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password"   placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                    registerError && <p className="text-3xl font-semibold text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-3xl font-semibold text-green-600">{success}</p>
                }
                <label className="label">
                               <p>Not Register yet? <Link to='/register'> <a href="#" className="label-text-alt link link-hover">Register here</a></Link></p>
                </label>
                </div>
            </div>
        </div>
    );
};

export default LogIn;