import { useHistory } from "react-router-dom"
import {useState } from "react";
import AddStudent from "./AddStudents";
import { Link } from "react-router-dom";
const Manging=({ students, nextpage, prevpage, setnextpage, setprevpage,setStudents})=>{
    const token = localStorage.getItem('token');
    const [modal,setmodal]=useState(false)
const history=useHistory()
    const ModalClose=()=>{
        setmodal(false)
    }


    // For deletion
    const DeleteStudent=(id)=>{
        if (window.confirm("Are you sure?")){
            fetch(`http://127.0.0.1:8000/students/${id}/`,{
            method:"DELETE",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Token ${token}`
            }

        })
        .then(response => {
            if (response.ok){
    
              return response.json()
            }
            else{
              history.push('/login');
            }
            })
        .then(data => setStudents(data.results))
        }
        

    }
    const fetchPage=(PageUrl)=>{
        fetch(PageUrl,{
            headers:{"Authorization":`Token ${token}`}
        })
        .then(response => {
            if (response.ok){
    
              return response.json()
            }
            else{
              alert("Please login..")
            }
            })
        .then(data=>{
            setnextpage(data.next)
            setprevpage(data.previous)
            setStudents(data.results);
        })

    }

    return(
        
        <div>
            <p id="before-table"></p>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Student No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Delete/Edit</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                    students.map((stu,i)=>{
                        const update_url=`/update/${stu.studentId}`
                        return(
                            <tr key={i}>
                            <td>{stu.studentId}</td>
                            <td>{stu.Firstname}</td>
                            <td>{stu.Lastname}</td>
                            <td>{stu.Email}</td>
                            <td>{stu.Course}</td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={()=>DeleteStudent(stu.studentId)}>Delete</button>
                                <a href={update_url} type="button" className="btn btn-primary">Edit</a>
                            </td>

                        </tr>
                        )
                        
                    }
                   
                    )}
                    
                    

                </tbody>

            </table>
           

             <div className="row">
                {prevpage &&
                    <div className="col text-start">
                        {/* Render "Previous" button only if prevpage exists */}
                        <Link className="btn btn-primary me-2" to="#" onClick={() => fetchPage(prevpage)}>Previous</Link>
                    </div>}
                {nextpage &&
                    <div className="col text-end">
                        {/* Render "Next" button only if nextpage exists */}
                        <Link className="btn btn-primary" to="#" onClick={() => fetchPage(nextpage)}>Next</Link>
                    </div>}
            </div>
            <p></p>
            {token &&
            <button className="btn btn-primary " type="button" onClick={()=>setmodal(true)}>Add Student</button>
            }
            
            {modal&&
            <AddStudent  show={modal}  onHide={ModalClose} />}
            
            

        </div>
    )
}
export default Manging;