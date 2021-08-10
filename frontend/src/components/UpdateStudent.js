import { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from "react-router-dom";

function UpdateStudent() {
    const baseUrl = "http://localhost:8080";
    const location = useLocation();
    const history = useHistory();
    const [student, setStudent] = useState(null);

    async function updateStudent(e) {
        e.preventDefault();
        await fetch(baseUrl+'/saveStudent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
        })
        .then((response => response.json()));
        history.push({ pathname: "/" });
    }

    function onChangeStudentFields(e) {
        switch(e.target.id) {
            case "studentFirstName":
                setStudent(prevStudent => ({ id: prevStudent.id, firstName: e.target.value, lastName: prevStudent.lastName, email: prevStudent.email }));
                break;
            case "studentLastName":
                setStudent(prevStudent => ({ id: prevStudent.id, firstName: prevStudent.firstName, lastName: e.target.value, email: prevStudent.email }));
                break;
            case "studentEmail":
                setStudent(prevStudent => ({ id: prevStudent.id, firstName: prevStudent.firstName, lastName: prevStudent.lastName, email: e.target.value }));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setStudent(location.state.student);
    }, []);

    return (
        <div class="container">
            <h1> Students Management System</h1>
            <hr/>
            <h2> Update Student</h2>
            <form onSubmit={updateStudent} method="POST">
                {student != null && <input type="text" id="studentFirstName" onChange={onChangeStudentFields} value={student.firstName} placeholder="First Name" class="form-control mb-4 col-4" />}
                {student != null && <input type="text" id="studentLastName" onChange={onChangeStudentFields} value={student.lastName} placeholder="Last Name" class="form-control mb-4 col-4" />}
                {student != null && <input type="text" id="studentEmail" onChange={onChangeStudentFields} value={student.email} placeholder="Email" class="form-control mb-4 col-4" />}

                <button type="submit" class="btn btn-info col-2">Update Student</button>
            </form>
            <br/>
            <button type="button" onClick={function() {history.push({ pathname: "/" })}} class="btn btn-warning">Back to List</button>
        </div>
    );
}

export default UpdateStudent;