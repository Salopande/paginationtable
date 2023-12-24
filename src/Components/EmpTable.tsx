import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Spinner, Table } from "react-bootstrap";

const EmpTable = () => {
  const [empData, setEmpData] = useState([]);
  const [pageData, setPageData] = useState([])
  const [page, setPage]=useState(1);
  const [pageCount, setPageCount]=useState(0)

  useEffect(() => {
    employeeData();
  }, [page]);

  useEffect(() => {
    const pageCount= Math.ceil(empData.length/10)
    setPageCount(pageCount)
    if(page){
      const limit =10;
      const skip = limit* page;
      const dataskip= empData.slice(page===1?0:skip-limit,skip)
      setPageData(dataskip)
    }
  }, [empData]);


  const employeeData = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/comments");
    const jsonData = await data.json();
    setEmpData(jsonData);
    console.log(empData);
  };

  const handleNext= ()=>{
     if(page===pageCount) return page
    setPage(page+1)
  }

  const handlePrev= ()=>{
    if(page===1) return page
    setPage(page-1)
  }
  return (
    <>
      <div>
        <h1>User Data</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? (
              pageData.map((emp) => (
                <tr>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.body}</td>
                </tr>
              ))
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-end">
        <Pagination>
          <Pagination.Prev onClick={handlePrev} disabled={page ===1}/>
          <Pagination.Item>{page}</Pagination.Item>

          <Pagination.Next onClick={handleNext} disabled={page === pageCount}/>
        </Pagination>
      </div>
    </>
  );
};

export default EmpTable;
