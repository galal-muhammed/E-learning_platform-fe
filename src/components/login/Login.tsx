import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Bars } from 'react-loader-spinner';
import { Signin } from "../../types/Signin";



export default function LogIn() {
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is reuired"),
        password: Yup.string()
            .required("password is reuired"),
    });
    const [isLoading, setLoading] = useState(false);

    async function sendData(values: Signin) {
        try {
            setLoading(true)
            let { data } = await axios.post(
                "http://localhost:3004/users/signin",
                values
            );
            console.log(data,);
            if (data.message == 'success') {
                setLoading(false);
                localStorage.setItem('usertoken', data.token)
                localStorage.setItem('role', data.role)
                if (data.role == `student`) {
                    navigate('/student')
                }
                else{
                    navigate('/prof')
                }
            }
            else {
                setLoading(false);
                console.log("incorrect email or password");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Please check your information")
        }
    }

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: sendData,
    });

    return (
        <>
            <div className="w-75 h-100  m-auto mt-2">
                <h3>Login </h3>
                <Toaster />
                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="userEmail">Email:</label>
                    <input
                        id="userEmail"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        type="email"
                        name="email"
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className="alert alert-danger">{formik.errors.email}</div>
                    ) : (
                        ""
                    )}

                    <label htmlFor="userPass">Password:</label>
                    <input
                        id="userPass"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        type="password"
                        name="password"
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <div className="alert alert-danger">{formik.errors.password}</div>
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
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <Link to='/register' className="text-main">Don't have an account?</Link>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-outline-success my-3">
                                    LogIn
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}