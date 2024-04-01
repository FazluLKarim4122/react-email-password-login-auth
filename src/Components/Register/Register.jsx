

const Register = () => {

    const handleRegister = e =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password, e)
    }
    return (
        <div className="border">
            <div className="mx-auto ">
                <h2 className="text-3xl font-bold">Register here</h2>
                <form onSubmit={handleRegister} className="space-y-3">
                    <input className="w-3/4 border-2 p-4" type="email" name="email" id="" placeholder="email" />
                    <br />
                    <hr />
                    <input className="w-3/4 border-2 p-4" type="password" name="password" id="" placeholder="pass" />
                    <br />
                    <hr />
                    <input className="w-3/4 btn btn-secondary " type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;