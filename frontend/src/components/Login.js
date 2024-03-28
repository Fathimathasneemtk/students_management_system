import { useHistory } from "react-router-dom"
const Login=()=>{
    const history=useHistory()
    const Submitdata=(e)=>{
        e.preventDefault()
        fetch("http://127.0.0.1:8000/login/",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                
            },
            "body":JSON.stringify({
                username:e.target.username.value,
                password:e.target.password.value
            })
        })
        .then(response=>
            {
                if (response.ok){
                   
                    return response.json()
                }
            })
            .then(data=>{
                // Store token in local storage or state for further use
                localStorage.setItem("token", data.token);
                alert("Logined successfully")
                history.push("/students")
                window.location.reload();
                console.log("login",data.token)})
        .catch(error=>{
            console.log("error :",error.message)
            alert("Error: ",error.message)
        })

    }
    return(
        <div className="row">
            
            <div className="col-sm-4"></div>
            <div className="col-sm-4 mt-5 allign-items-center">
            <h1>Login</h1>
            <form onSubmit={Submitdata} >
                <div className="mb-3 ">
                    <label for="exampleInputUsername" className="form-label">Username</label>
                    <input name="username" type="text" className="form-control" id="exampleInputUsername" aria-describedby="UsernameHelp"/>
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
export default Login;