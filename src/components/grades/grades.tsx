import { useEffect, useState } from "react"
import axios from 'axios';
import { Bars } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import React from "react";

export default function Grades() {
    const headers = {
        token: localStorage.getItem('usertoken')
    }
    const [isLoading, setLoading] = useState(false);
    const [grades, setgrades] = useState([]);
    async function getAllGrades() {
        let grades: any = await axios.get("http://localhost:3004/grades/",{headers}).then(res => res).catch(err => err)
        // console.log(grades);
        setgrades(grades)
    }
    useEffect(() => {
        getAllGrades()
    })
    return <>
        {
            isLoading ? <div className='d-flex justify-content-center align-items-center vh-100'>
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
                :
                <div className="container">
                    <div className="row">
                        <Toaster />
                        {grades.length>0? grades.data?.courses.map((course: any) => {
                            return <>
                                <div className="col-md-3" key={course._id}>
                                    <div className="card text-center">
                                        <img className="card-img-top" src={course.image} alt={course.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{course.title}</h5>
                                            <p className="card-text">{course.description}</p>
                                            <button onClick={() => { EnrollCourseC(course._id) }} className="btn btn-primary">Enroll Course</button>
                                            <button onClick={() => { dropCourseC(course._id) }} className="btn btn-danger">drop Course</button>
                                        </div>
                                    </div>
                                </div >
                            </>
                        }):<h2>no grades to view</h2>}
                    </div>
                </div >
        }
    </>
}

