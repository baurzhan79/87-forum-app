import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Alert } from "react-bootstrap";

import {
    MDBContainer,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBValidation,
    MDBValidationItem
} from "mdb-react-ui-kit";


import { loginUser, loginUserInit } from "../../store/actions/usersActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Login = () => {
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const { loginError, loading, user } = useSelector(state => state.users, shallowEqual);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loginUserInit());
    }, [dispatch]);

    useEffect(() => {
        if (user !== null) navigate("/");
    }, [user, navigate]);

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const submitFormHandler = async () => {
        await dispatch(loginUser({ ...state }));
    };

    // =========================================================
    if (loading) return (<Spinner />);
    else
        return (
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample img" />
                    </MDBCol>

                    <MDBCol col='4' md='6' className='d-flex flex-column align-items-center'>
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <p className="lead fw-normal mb-0 me-3">Sign in</p>
                        </div>
                        {
                            loginError &&
                            <Alert key="primary" variant="primary">
                                {loginError.error}
                            </Alert>
                        }
                        <MDBValidation className='row g-3' isValidated>
                            <MDBValidationItem className='mb-4' feedback="Username should not be empty" invalid>
                                <MDBInput
                                    value={state.username}
                                    name='username'
                                    placeholder="Enter username"
                                    type='text'
                                    className='w-100'
                                    required={true}
                                    onChange={inputChangeHandler}
                                />
                            </MDBValidationItem>
                            <MDBValidationItem className='mb-4' feedback="Password should not be empty" invalid>
                                <MDBInput
                                    value={state.password}
                                    name='password'
                                    placeholder="Enter password"
                                    type='password'
                                    required={true}
                                    onChange={inputChangeHandler}
                                />
                            </MDBValidationItem>
                        </MDBValidation>

                        <MDBBtn className='mb-4' size='lg' type='submit' onClick={submitFormHandler}>Sign In</MDBBtn>

                        <div className='mb-4'>
                            <p>Are you not registered yet? <a href="/register">Sign up</a></p>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
}

export default Login