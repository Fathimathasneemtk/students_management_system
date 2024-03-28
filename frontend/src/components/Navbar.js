import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
const Navbar=({setSearchtext,setsearchedtext,searchtext})=>{
  const history=useHistory()
  // retriving token
  const token = localStorage.getItem('token');  
  const handleLogout=(e)=>{
    e.preventDefault()
      fetch("http://127.0.0.1:8000/logout/",{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json",
          "Authorization": `Token ${token}`

        }
      })
      .then(response=>{
        if (response.ok){
          // if logout is ok ,then remove token
          localStorage.removeItem('token')
          history.push('/login');
          window.location.reload();
          alert("Logout successfully")
          
        }
        else{
          console.log("logout failed")
          alert("Please Login...")
          history.push('/login');
        }
      })
      .catch(error=>{
        console.error("Logout failed ",error.message)
      })
    }

    const searchedevent=(e)=>{
      e.preventDefault()
      history.push(`/search`)
      setsearchedtext(searchtext)
      setSearchtext('')

    }
    const searchevent=(e)=>{
      e.preventDefault()
      setSearchtext(e.target.value)

    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">Students Management system</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/students">Listing Students</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/student_manage">Managing Students</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        User
                      </Link>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/signup">Signup</Link></li>
                        <li><Link className="dropdown-item" to="/login">Login</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" to="#" onClick={handleLogout} >Logout</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <form className="d-flex">
               <input className="form-control me-2" onChange={searchevent}  value={searchtext} type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" onClick={searchedevent} type="submit">Search</button>
              </form>
            </nav>
        </div>
    )
}
export default Navbar;