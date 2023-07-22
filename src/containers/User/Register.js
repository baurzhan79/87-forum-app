import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCardImage,
    MDBInput,
    MDBValidation,
    MDBValidationItem
} from "mdb-react-ui-kit";

import { registerUser, registerUserInit } from "../../store/actions/usersActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Register = () => {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [fieldErrors, setFieldErrors] = useState({
        username: {
            errorMessage: "",
            invalid: false
        },
        email: {
            errorMessage: "",
            invalid: false
        },
        password: {
            errorMessage: "",
            invalid: false
        }
    });

    const { registerError, loading, registeredUser } = useSelector(state => state.users, shallowEqual);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(registerUserInit());
    }, [dispatch]);

    useEffect(() => {
        if (registeredUser !== null) navigate("/");
    }, [registeredUser, navigate]);

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const getFieldError = fieldName => {
        try {
            return registerError.errors[fieldName].message;
        }
        catch {
            return undefined;
        }
    };

    const checkFieldError = fieldName => {
        const fieldErrorMessage = getFieldError(fieldName);
        if (fieldErrorMessage !== undefined) {
            setFieldErrors(prevState => {
                return {
                    ...prevState, [fieldName]: {
                        errorMessage: `[${state[fieldName]}] ${fieldErrorMessage}`,
                        invalid: true
                    }
                };
            });

            setState(prevState => {
                return { ...prevState, [fieldName]: "" };
            });
        }

        else
            setFieldErrors(prevState => {
                return {
                    ...prevState, [fieldName]: {
                        errorMessage: "",
                        invalid: false
                    }
                };
            });
    }

    useEffect(() => {
        checkFieldError("username");
        checkFieldError("email");
        checkFieldError("password");
    }, [registerError]);

    const submitFormHandler = async () => {
        await dispatch(registerUser({ ...state }));
    };

    // =========================================================
    if (loading) return (<Spinner />);
    else
        return (
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <MDBValidation className='row g-3' isValidated>
                            <MDBValidationItem className='mb-4' feedback={fieldErrors.username.errorMessage} invalid={fieldErrors.username.invalid}>
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
                            <MDBValidationItem className='mb-4' feedback={fieldErrors.email.errorMessage} invalid={fieldErrors.email.invalid}>
                                <MDBInput
                                    value={state.email}
                                    name='email'
                                    placeholder="Enter email"
                                    type='email'
                                    required={true}
                                    onChange={inputChangeHandler}
                                />
                            </MDBValidationItem>
                            <MDBValidationItem className='mb-4' feedback={fieldErrors.password.errorMessage} invalid={fieldErrors.password.invalid}>
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

                        <MDBBtn className='mb-4' size='lg' type='submit' onClick={submitFormHandler}>Sign Up</MDBBtn>

                        <div className='mb-4'>
                            <p>Already have an account? <a href="/login">Sign in</a></p>
                        </div>
                    </MDBCol>

                    <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
}

export default Register;