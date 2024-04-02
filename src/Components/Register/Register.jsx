import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {
    //same email use korle 1ta error ashe console e,amra shei error take ui te text hishebe dekhate chai then by default kono erro nai useState e empty string boshalam
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const acceptTerms = e.target.terms.checked
        console.log(email, password, acceptTerms)
        //reset error message(protibar jokhon form submit korbo tokhon hoar aage error message take clear hoye jabe , jodi clear na kori tahole state e error ta theke jabe)
        setRegisterError('')
        setSuccess('')
        //server side e jawar aagei client side theke validate kore dite pari. password 6 character er kom hole firebase auto validate kore err message show korbe. eta amra jani tai form submit kore firebase theke err khawa porjonto jaoar to dorkar nai, amra chaile create user / form submit e jaoar aagei validate kore dite pari. 
        //and of course return kore dibo that means-ei validation/function er pore she ar agabena jodi password below 6 characters.
        //we know that input field value is a string.
        console.log(typeof (password))
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one UpperCase Characters')
            return
        }
        else if (!acceptTerms) {
            setRegisterError('Please accept our Terms and condition')
            return
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('You create user successfully')
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('Email Verification sent')
                })
            })
            .catch(error => {
                console.log(error)
                console.log(error.message)
                setRegisterError(error.message)
            })
    }

    // Password show/hide:
    const [showPassword, setShowPassword] = useState(false)

    // Terms and Conditions
    // muloto accept na korle 1ta warning debo
    /**
     * 1. access korte hobe
     */

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl font-bold mb-8">Register here</h2>
                <form onSubmit={handleRegister} className="space-y-3">
                    <input className="w-full border-2 p-4 mb-4" type="email" name="email" id="" placeholder="email" required />
                    <br />
                    <hr />
                    <div className="relative border mb-4">
                        <input className="w-full border-2 p-4 " type={showPassword ? "text" : "password"}
                            name="password"
                            id="" placeholder="pass" required />
                        {/* Password show/hide: type take change kore dibo, 1ta state rakhbo then btn click hole type pass theke text hoye jabe,again click korle show theke hide hoye jabe, mane je man ta thakbe sheta ultay dibe. default hide kora thakbe  */}
                        <span className="absolute top-6 right-4" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye />
                                //if showPassword is true means showing password then show hide icon,if show false then show 'show icon
                            }
                        </span>
                    </div>
                    <br />
                    <div className="">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms"><a href="">Accept our Terms and Conditions</a></label>
                    </div>
                    <hr />
                    <input className="w-3/4 btn btn-secondary mb-4 " type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-3xl font-semibold text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-3xl font-semibold text-green-600">{success}</p>
                }
                <label className="label">
                    <p>Already have an account? <Link to='/login'> <a href="#" className="label-text-alt link link-hover">Login here</a></Link></p>
                </label>
            </div>
        </div>
    );
};

export default Register;