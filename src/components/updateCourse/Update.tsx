import { useEffect, useState } from "react"
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Bars } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React from "react";

export default function Update() {
    const navigate = useNavigate()
    const [avarage, setAvarage] = useState(null);

    const headers = {
        token: localStorage.getItem('usertoken')
    }
    const { id } = useParams();

    const [course, setcourse] = useState([]);
    async function getsingleCourses() {
        console.log(id);
        let courseId = id
        let course: any = await axios.get(`http://localhost:3004/courses/${courseId}`, { headers }).then(res => res).catch(err => err)
        console.log(course.data.course);
        formik.values.title = course.data.course.title
        formik.values.description = course.data.course.description
        setcourse(course)
    }
    async function getavarageGrades() {
        console.log(id);
        let courseId = id
        let course: any = await axios.get(`http://localhost:3004/grades/${id}/average`, { headers }).then(res => res).catch(err => err)
        console.log(course.data.avarageGrades.AvarageGrade);
        setAvarage(course)
    }
    const [isLoading, setLoading] = useState(false);
    async function sendData(values: any) {
        console.log("here");
        let courseId = id
        try {

            setLoading(true)
            let { data } = await axios.put(
                `http://localhost:3004/courses/${courseId}`,
                values,
                { headers }
            );
            console.log(data,);
            if (data.message == 'success') {
                setLoading(false);
                navigate('/prof')
                toast.success("course updated successfuly", {
                    duration: 2000
                })
            }
            else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Please check course information")
        }
    }
    let validate = Yup.object({
        title: Yup.string().optional(),
        description: Yup.string().optional()
    });
    let formik = useFormik({
        initialValues: {
            title: " ",
            description: " ",
        },
        onSubmit: sendData,
        validationSchema: validate,
    });
    useEffect(() => {
        getsingleCourses()
        getavarageGrades()
    }, [])
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
                        <div className="offset-md-2 col-md-8 mt-4">

                            <div className={`col-md-12 edit}`}>
                                {
                                    // console.log(avarage?.data.avarageGrades)
                                    
                                    <p key={avarage?.data.avarageGrades?._id||0}>avarage grade:{avarage?.data.avarageGrades?.AvarageGrade ||0}</p>

                                }

                                <form onSubmit={formik.handleSubmit}>
                                    <input
                                        id="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        onBlur={formik.handleBlur}
                                        className="form-control border border-primary mb-3"
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
                                        className="form-control border border-primary mb-3"
                                        type="text"
                                        placeholder="description"
                                    ></input>
                                    {formik.errors.description && formik.touched.description ? (
                                        <div className="alert alert-danger">{formik.errors.description}</div>
                                    ) : (
                                        ""
                                    )}
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
                                            <button type="submit" className="btn btn-success w-100">update course </button>
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

