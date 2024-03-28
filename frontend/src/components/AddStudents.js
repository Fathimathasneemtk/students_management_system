
import { useHistory } from "react-router-dom"
import {useState } from "react";
const AddStudent=({show,onHide})=>{
  const history=useHistory()
  const token = localStorage.getItem('token');  
  const [warningMessage, setWarningMessage] = useState('');
    const validate=(e)=>{
      const { name, value } = e.target;
      if (/[^\w\s]/gi.test(value)) {
        // If escape characters found, update warning message
        setWarningMessage(`Non-alphanumeric characters are not allowed for '${name}'.`);
        // Don't update formData if escape characters detected
        return;
    }
    setWarningMessage('');

    }  
    const SubmitStudent=(e)=>{
        e.preventDefault();
        fetch("http://127.0.0.1:8000/students/", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`

            },
            body: JSON.stringify({
              studentId: null,
              Firstname: e.target.Firstname.value,
              Lastname: e.target.Lastname.value,
              Email: e.target.Email.value,
              Course: e.target.Course.value
            })
          })
        .then(response => {
            if (response.ok) {
              history.push("/students")
              window.location.reload();
              return alert("successfully Updated")
            } else {
              throw new Error('Network response was not ok');
            }
          })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed"); // Handle error
          });
    }

    return(
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add students</h5>
              <button type="button" className="btn-close" onClick={onHide} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {warningMessage && (
                <div className="alert alert-warning" role="alert">
                    {warningMessage}
                </div>
            )}
            <form onSubmit={SubmitStudent}>
            <div className="mb-3">
                <label htmlFor="exampleInputfname" className="form-label">First Name</label>
                <input  type="text" name="Firstname" className="form-control" id="exampleInputfname" aria-describedby="emailHelp" onChange={validate} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputlname" className="form-label">Last Name</label>
                <input  type="text" name="Lastname" className="form-control" id="exampleInputlname" aria-describedby="emailHelp" onChange={validate} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input  type="email" name="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
                
            <div className="mb-3">
                <label htmlFor="exampleInputcourse" className="form-label">Course</label>
                <input  type="text"  name="Course" className="form-control" id="exampleInputcourse" aria-describedby="emailHelp" onChange={validate} required/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onHide}>Close</button>
            </div>
          </div>
        </div>
          </div>
    )

  

}
export default AddStudent;




