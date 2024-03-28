import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Update=()=>{
    const {id} =useParams()
    const [updatedata,setUpdatedata]=useState([])
    const [fname,setFname]=useState('')
    const [lname,setLname]=useState('')
    const [email,setEmail]=useState('')
    const [course,setCourse]=useState('')
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/students/${id}/`,{
            headers:{
                "Authorization":`Token ${token}`
            }
        }) // Fetch single student data
            .then(response => response.json())
            .then(data => {
                setUpdatedata(data);
                setFname(data.Firstname); // Set initial values
                setLname(data.Lastname);
                setEmail(data.Email);
                setCourse(data.Course);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id,token]); // Fetch data when ID changes

    

    const SubmitData = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/students/`, { // Update specific student by ID
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({
                studentId:id,
                Firstname: fname,
                Lastname: lname,
                Email: email,
                Course: course
            })
        })
        .then(response => response.json())
        .then(data => console.log('Update successful:', data))
        .catch(error => console.error('Error updating data:', error));
    }


    return(
        <div>
             {updatedata && 
             <form onSubmit={SubmitData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputfname" className="form-label">First Name</label>
                    <input onChange={(e)=>{
                        setFname(e.target.value)
                    }} value={fname} type="text" name="Firstname" className="form-control" id="exampleInputfname" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputlname" className="form-label">Last Name</label>
                    <input onChange={(e)=>{
                        setLname(e.target.value)
                    }}  value={lname} type="text" name="Lastname" className="form-control" id="exampleInputlname" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={(e)=>{
                        setEmail(e.target.value)
                    }}  value={email} type="email" name="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                    
                <div className="mb-3">
                    <label htmlFor="exampleInputcourse" className="form-label">Course</label>
                    <input onChange={(e)=>{
                        setCourse(e.target.value)
                    }}  value={course} type="text"  name="Course" className="form-control" id="exampleInputcourse" aria-describedby="emailHelp"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>}
            
            
        </div>
    )

}
export default Update;