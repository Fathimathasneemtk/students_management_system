import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";

const Students = ({ students, nextpage, prevpage, setnextpage, setprevpage, setStudents }) => {
    // console.log("stu",students)
    const token = localStorage.getItem('token');
const history=useHistory()
    console.log("students",token)
    const fetchPage = (pageUrl) => {
        fetch(pageUrl,{headers:{
            "Authorization":`Token ${token}`
          }})
          .then(response => {
            if (response.ok){
    
              return response.json()
            }
            else{
              history.push('/login');
            }
            })
            .then(data => {
                setnextpage(data.next);
                setprevpage(data.previous);
                setStudents(data.results);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    const dataload = students.map((obj, i) => {
        return (
            <tr key={i}>
                <td>{obj.studentId}</td>
                <td>{obj.Firstname}</td>
                <td>{obj.Lastname}</td>
                <td>{obj.Email}</td>
                <td>{obj.Course}</td>
            </tr>
        );
    });

    return (
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
                    </tr>
                </thead>
                <tbody>
                    {dataload}
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
        </div>
    );
};

export default Students;
