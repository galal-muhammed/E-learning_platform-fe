import { useEffect, useState } from "react"
import axios from 'axios';
import { Bars } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import React from "react";

export default function CoursesHome() {
    const headers = {
        token: localStorage.getItem('usertoken')
    }
    const [isLoading, setLoading] = useState(false);
    const [courses, setcourses] = useState([]);
    async function getAllCourses() {
        let courses: any = await axios.get("http://localhost:3004/courses").then(res => res).catch(err => err)
        // console.log(courses);
        setcourses(courses)
    }
    async function EnrollCourseC(courseId: string) {
        console.log(headers);
        console.log(courseId);


        let courses = await axios.get(`http://localhost:3004/courses/${courseId}/enroll`, { headers }).then(res => res).catch(err => err)
        if (courses.data.message = "success") {
            toast.success("course ednrolled successfuly")
        }
        console.log(courses);
    }
    async function dropCourseC(courseId: string) {
        console.log(headers);
        console.log(courseId);
        let courses = await axios.get(`http://localhost:3004/courses/${courseId}/drop`, { headers }).then(res => res).catch(err => err)
        if (courses.data.message = "success") {
            toast.success("course droped successfuly")
        }
        console.log(courses);
    }
    async function getGrades(courseId: string) {
        console.log(headers);
        console.log(courseId);
        let courses = await axios.get(`http://localhost:3004/grades/${courseId}`, { headers }).then(res => res).catch(err => err)
        if (courses.data.message = "success") {
            toast.success("course droped successfuly")
        }
        console.log(courses);
    }
    useEffect(() => {
        getAllCourses()
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
                        <div className="col-md-8 mb-4">
                            <input type="text" id='search' placeholder='search' className='form-control w-75 mx-auto' />
                        </div>
                        <div className="offset-md-1 col-md-3 mb-4">
                            <a href="/grades" className="btn btn-primary">Veiw grades</a>
                        </div>
                        {courses.data?.courses.map((course: any) => {
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
                        })}
                    </div>
                </div >
        }
    </>
}

