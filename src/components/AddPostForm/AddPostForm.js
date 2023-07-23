import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import FileInput from "../UI/Form/FileInput";

const AddPostForm = ({ onSubmit }) => {
    const [state, setState] = useState({
        title: "",
        description: "",
        image: ""
    });

    const [requireTitleText, setRequireTitleText] = useState("");
    const [requireDescriptionImageText, setRequireDescriptionImageText] = useState("");
    const [isSendBtnDisabled, setIsSendBtnDisabled] = useState(true);

    useEffect(() => {
        if (state.title === "") setRequireTitleText("Title should not be empty!");
        else setRequireTitleText("");

        if (state.description === "" && state.image === "") setRequireDescriptionImageText("Description or image should not be empty!");
        else setRequireDescriptionImageText("");
    }, [state]);

    useEffect(() => {
        if (requireTitleText === "" && requireDescriptionImageText === "") setIsSendBtnDisabled(false);
        else setIsSendBtnDisabled(true);
    }, [requireTitleText, requireDescriptionImageText]);

    // ============================================
    const textChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }

    const fileChangeHandler = (event) => {
        if (event.target.files[0] !== undefined) setState({ ...state, image: event.target.files[0] });
        else setState({ ...state, image: "" });
    }

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(state).forEach(key => {
            if (state[key] !== "") formData.append(key, state[key]);
        });
        onSubmit(formData);
    };

    return (
        <form>
            <Container className="border border-primary mt-2">
                <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px" }}> Add new post</p>
                <Row className="mt-2">
                    <Col>
                        <Form.Label>{"Title"}</Form.Label>
                        <Form.Control
                            type={"text"}
                            name={"title"}
                            onChange={textChangeHandler}
                        />
                        <Form.Text>
                            {requireTitleText}
                        </Form.Text>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Form.Label>{"Description"}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name={"description"}
                            onChange={textChangeHandler}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <FileInput onChange={fileChangeHandler} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Form.Text>
                            {requireDescriptionImageText}
                        </Form.Text>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col style={{ textAlign: "center" }}>
                        <Button disabled={isSendBtnDisabled} variant="primary" size="lg" type="submit" onClick={submitFormHandler}>
                            Create post
                        </Button>
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default AddPostForm