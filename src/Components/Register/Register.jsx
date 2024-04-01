import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";


const Register = () => {
    //same email use korle 1ta error ashe console e,amra shei error take ui te text hishebe dekhate chai then 
    const [registerError, setRegisterError] = useState()

    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        // console.log(email, password, e)
        //reset error message(protibar jokhon form submit korbo tokhon hoar aage error message take clear hoye jabe , jodi clear na kori tahole state e error ta theke jabe)
        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)

            })
            .catch(error => {
                console.log(error)
                console.log(error.message)
                setRegisterError(error.message)
            })
    }


    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl font-bold mb-8">Register here</h2>
                <form onSubmit={handleRegister} className="space-y-3">
                    <input className="w-3/4 border-2 p-4 mb-4" type="email" name="email" id="" placeholder="email" />
                    <br />
                    <hr />
                    <input className="w-3/4 border-2 p-4 mb-4" type="password" name="password" id="" placeholder="pass" />
                    <br />
                    <hr />
                    <input className="w-3/4 btn btn-secondary mb-4 " type="submit" value="Register" />
                </form>
                {
                registerError && <p className="text-3xl font-semibold">{registerError}</p>
            }
            </div>
        </div>
    );
};

export default Register;