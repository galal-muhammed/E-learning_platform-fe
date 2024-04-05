import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Bars } from "react-loader-spinner";
import { Signup } from "../../types/Signup";

export default function Register() {
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        firstName: Yup.string().matches(/^[A-Za-z]{3,20}/, "please use letters only,and enter at least 3 letters")
            .min(3, "must be more than 3")
            .max(15)
            .required("fitst name is required"),
        lastName: Yup.string().matches(/^[A-Za-z]{3,20}/, "please use letters only,and enter at least 3 letters")
            .min(3, "must be more than 3")
            .max(15)
            .required("last name is required"),
        email: Yup.string().matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "please enter valid email")
            .required("Email is reuired"),
        password: Yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "password must be at least 8 characters")
            .required("password is reuired"),
    });
    const [isLoading, setLoading] = useState(false);

    async function sendData(values: Signup) {
        console.log("hello");

        try {
            setLoading(true)
            let { data } = await axios.post(
                "http://localhost:3004/users/create",
                values
            );
            console.log(data);
            if (data.message == 'success') {
                setLoading(false);
                navigate('/LogIn')
            }
        }
        catch (error) {
            console.log(error);

            setLoading(false);
            toast.error("Please check your email and password")
        }
    }

    let formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "student"
        },
        validationSchema,
        onSubmit: sendData,
    });

    return (
        <>
            <div className="w-75  mx-auto">
                <h3>signup</h3>
                <Toaster />
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="firstName">first name:</label>
                    <input
                        id="firstName"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        type="text"
                        name="firstName"
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="alert alert-danger">{formik.errors.firstName}</div>
                    ) : (
                        ""
                    )}

                    <label htmlFor="lastName">last name:</label>
                    <input
                        id="lastName"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        type="text"
                        name="lastName"
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                        <div className="alert alert-danger">{formik.errors.lastName}</div>
                    ) : (
                        ""
                    )}

                    <label htmlFor="email">email:</label>
                    <input
                        id="email"
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

                    <label htmlFor="userPass" className="mb-1">Password:</label>
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

                    <label htmlFor="role" className="mb-1">role</label>
                    <select name="languages" id="lang" className="form-select" aria-label="Default select example"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                        onBlur={formik.handleBlur}>
                        <option value="student" selected>student</option>
                        <option value="professor">professor</option>

                    </select>
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
                                <Link to='/login' className="text-main">already have an account?</Link>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-outline-success my-3" >
                                    signup
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}