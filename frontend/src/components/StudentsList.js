import { render } from '@testing-library/react';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

function StudentsList() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const [sortField, setSortField] = useState("");
    const [sortDir, setSortDir] = useState("");
    const [reverseSortDir, setReverseSortDir] = useState("");

    const [listStudents, setListStudents] = useState([]);

    const history = useHistory();
    const baseUrl = "http://localhost:8080";

    async function getListStudents() {
        return await fetch(baseUrl+'/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response => response.json()));
    }

    useEffect(() => {
        const response = getListStudents();
        response.then(r => {
            setCurrentPage(r.currentPage);
            setTotalPages(r.totalPages);
            setTotalItems(r.totalItems);

            setSortField(r.sortField);
            setSortDir(r.sortDir);
            setReverseSortDir(r.reverseSortDir);

            setListStudents(r.listStudents);
        });
    }, []);

    async function invokeShowNewStudentForm() {
        return await fetch(baseUrl+'/showNewStudentForm', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response => response.json()));
    }

    const showNewStudentForm = event => {
        const response = invokeShowNewStudentForm();
        response.then(student => {
            history.push({
                pathname: "/showNewStudentForm",
                state: {student: student}
            });
        });
    };

    async function invokeShowFormForUpdate(id) {
        return await fetch(baseUrl+'/showFormForUpdate/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response => response.json()));
    }

    async function showStudentFormForUpdate(id) {
        const response = invokeShowFormForUpdate(id);
        response.then(r => {
            history.push({
                pathname: "/showFormForUpdate/"+r.student.id,
                state: {student: r.student}
            });
        });
    };

    async function findPaginated(option) {
        const url = `${baseUrl}/page/${option.pageNo}?sortField=${sortField}&sortDir=${sortDir}`;
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response => response.json()));
    }

    async function showListBasedOnPaginationOption(pageNo) {
        const response = await findPaginated({
            pageNo,
            sortField,
            sortDir
        }).then(r => {
            setCurrentPage(r.currentPage);
            setTotalPages(r.totalPages);
            setTotalItems(r.totalItems);

            setSortField(r.sortField);
            setSortDir(r.sortDir);
            setReverseSortDir(r.reverseSortDir);

            setListStudents(r.listStudents);
        });
    }

    const Pagination = (i) => {
        var rows = [];
        for (let index = 1; index <= totalPages; index++) {
            currentPage != index ? rows.push(<button style={{marginRight: "20px", display: 'inline-block'}} class="btn btn-link" onClick={() => showListBasedOnPaginationOption(index, sortField, sortDir)}>{index}</button>)
            : rows.push(<span style={{marginRight: "20px", display: 'inline-block'}}>{index}</span>);
        }
        return rows;
    }

    async function deleteStudent(id) {
        return await fetch(baseUrl+'/deleteStudent/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(function() {
            window.location.reload();
        });
    }

    return (
        <div className="App">
            <div class="container my-2">
                <h1>Students List</h1>
                <button onClick={showNewStudentForm} class="btn btn-primary btn-sm mb-3"> Add Student </button>
                <table border="1" class="table table-striped table-responsive-md">
                    <thead>
                    <tr>
                        <th>
                            {/* <a th:href="{'/page/' + ${currentPage} + '?sortField=firstName&sortDir=' + ${reverseSortDir}}"></a> */}
                            First Name
                        </th>
                        <th>
                            {/* <a th:href="@{'/page/' + ${currentPage} + '?sortField=lastName&sortDir=' + ${reverseSortDir}}"></a> */}
                            Last Name
                        </th>
                        <th>
                            {/* <a th:href="@{'/page/' + ${currentPage} + '?sortField=email&sortDir=' + ${reverseSortDir}}"></a> */}
                            Email
                        </th>
                        <th> Actions </th>
                    </tr>
                    </thead>
                    <tbody>
                        {listStudents.map(student => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td><button onClick={() => {showStudentFormForUpdate(student.id)}}class="btn btn-primary">Update</button></td>
                            <td><button onClick={() => {deleteStudent(student.id)}} class="btn btn-danger">Delete</button></td>
                        </tr>    
                        ))}
                    </tbody>
                </table>
                {totalPages > 1 && <div>
                    <div class = "row col-sm-10">
                        <div class = "col-sm-2">
                        Total Rows: {totalItems}
                        </div>
                        <div class = "col-sm-1">
                            <Pagination/>
                        </div>
                        <div class = "col-sm-1">
                            {currentPage < totalPages ? 
                                <button onClick={() => showListBasedOnPaginationOption(currentPage+1, sortField, sortDir)} class="btn btn-link">Next</button>
                                : <span>Next</span>}
                        </div>
                        <div class = "col-sm-1">
                            {currentPage < totalPages ?
                                <button onClick={() => showListBasedOnPaginationOption(totalPages, sortField, sortDir)} class="btn btn-link">Last</button>
                                :<span>Last</span>}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default StudentsList;