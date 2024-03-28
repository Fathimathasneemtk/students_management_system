import { useHistory } from "react-router-dom"
const Signup=()=>{
    const history=useHistory()
    const Submitdata=(e)=>{
        e.preventDefault()
        fetch("http://127.0.0.1:8000/signup/",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:e.target.username.value,
                password:e.target.password.value,
                email:e.target.email.value
            })


        })
        .then(response=>{
            if (response.ok){
                alert("User Successfully registered")
                history.push('/home')
            }
        })
        .catch(error=>{
            alert("Error: " + error.message);
        })
    }

    return(
        <div className="row">
            
            
            <div className="col-sm-4"></div>
            <div className="col-sm-4 mt-5 allign-items-center">
            <h1>Signup</h1>
            <form onSubmit={Submitdata} >
                <div className="mb-3 ">
                    <label for="exampleInputUsername" className="form-label">Username</label>
                    <input name="username" type="text" className="form-control" id="exampleInputUsername" aria-describedby="UsernameHelp"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>

        </div>
        
    )

}
export default Signup;