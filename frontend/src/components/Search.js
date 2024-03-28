
const Search = ({searchresult}) => {

    const dataload = searchresult.map((obj,i)=>{
        return(
                <tr key={i}>
                    <td>{obj.studentId}</td>
                    <td>{obj.Firstname}</td>
                    <td>{obj.Lastname}</td>
                    <td>{obj.Email}</td>
                    <td>{obj.Course}</td>
                </tr>

        )
    })
    

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
        </div>
    );
};

export default Search;
