import { useEffect, useState } from "react"
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Bars } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import React from "react";

export default function Professorhome() {
    const [edit, setEdit] = useState(false);
    const [courses, setcourses] = useState([]);
    const headers = {
        token: localStorage.getItem('usertoken')
    }
    async function getAllCourses() {
        let courses: any = await axios.get("http://localhost:3004/courses").then(res => res).catch(err => err)
        // console.log(courses);
        setcourses(courses)
    }
    const [isLoading, setLoading] = useState(false);
    async function sendData(values: any) {
        console.log("here");
        try {
            setLoading(true)
            let { data } = await axios.post(
                "http://localhost:3004/courses/create",
                values,
                { headers }
            );
            console.log(data,);
            if (data.message == 'success') {
                setLoading(false);
                toast.success("course added successfuly", {
                    duration: 2000
                })
            }
            else {
                setLoading(false);
                console.log("incorrect email or password");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Please check course information")
        }
    }
    async function deleteCourse(courseId: string) {
        console.log(headers);
        console.log(courseId);

        let courses = await axios.delete(`http://localhost:3004/courses/${courseId}`, { headers }).then(res => res).catch(err => err)
        if (courses.data.message = "success") {
            toast.success("course deleted successfuly")
        }
        console.log(courses);
    }
    let validate = Yup.object({
        title: Yup.string()
            .required("title Required"),
        description: Yup.string()
            .required("description Required")
    });

    let formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        onSubmit: sendData,
        validationSchema: validate,
    });
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
                        {courses.data?.courses.map((course: any) => {
                            return <>
                                <div className="col-md-3" key={course._id}>
                                    <div className="card text-center">
                                        <img className="card-img-top" src={course.image} alt={course.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{course.title}</h5>
                                            <p className="card-text">{course.description}</p>
                                            <a href={`/${course._id}`} className="btn btn-success mb-2 w-100">update Course and see grades</a>
                                            <button onClick={()=>{deleteCourse(course._id)}} className="btn btn-danger w-100 mb-2">Delete Course</button>
                                        </div>
                                    </div>
                                </div >
                            </>
                        })}
                        <div className="offset-md-2 col-md-8 mt-4">
                            <button onClick={() => setEdit(!edit)} className="btn btn-primary w-100">add course </button>

                            <div className={`col-md-12 edit ${edit ? "" : "d-none"}`}>
                                <form onSubmit={formik.handleSubmit}>
                                    <input
                                        id="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        onBlur={formik.handleBlur}
                                        className="form-control border border-primary"
                                        type="text"
                                        placeholder="title"
                                    ></input>
                                    {formik.errors.title && formik.touched.title ? (
                                        <div className="alert alert-danger">{formik.errors.title}</div>
                                    ) : (
                                        ""
                                    )}
                                    <input
                                        id="description"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        onBlur={formik.handleBlur}
                                        className="form-control border border-primary"
                                        type="text"
                                        placeholder="description"
                                    ></input>
                                    {formik.errors.description && formik.touched.description ? (
                                        <div className="alert alert-danger">{formik.errors.description}</div>
                                    ) : (
                                        ""
                                    )}
                                    <input
                                        className="form-control border border-primary"
                                        type="file"
                                        placeholder="image"
                                    ></input>
                                    {isLoading ? (
                                        <Bars
                                            height="80"
                                            width="80"
                                            color="#4fa94d"
                                            ariaLabel="bars-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                        />
                                    ) : (
                                        <div className="offset-md-3 col-md-6">
                                            <button type="submit" className="btn btn-primary w-100">create course </button>
                                        </div>)
                                    }
                                </form>
                            </div>
                        </div>

                    </div>
                </div >
        }
    </>
}

