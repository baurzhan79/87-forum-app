import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddCommentForm = ({ onSubmit, postId }) => {
    const [state, setState] = useState({
        comment: ""
    });

    const [requireCommentText, setRequireCommentText] = useState("");
    const [isSendBtnDisabled, setIsSendBtnDisabled] = useState(true);

    useEffect(() => {
        if (state.comment === "") setRequireCommentText("Comment should not be empty!");
        else setRequireCommentText("");
    }, [state]);

    useEffect(() => {
        if (requireCommentText === "") setIsSendBtnDisabled(false);
        else setIsSendBtnDisabled(true);
    }, [requireCommentText]);

    // ============================================
    const textChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }

    const submitFormHandler = e => {
        e.preventDefault();

        const newComment = {
            postId: postId,
            text: state.comment
        }
        onSubmit(newComment);
    };

    return (
        <form>
            <Container className="border border-primary mt-2">
                <p style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px" }}> Add comment</p>
                <Row className="mt-2">
                    <Col>
                        <Form.Label>{"Comment"}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name={"comment"}
                            onChange={textChangeHandler}
                        />
                        <Form.Text>
                            {requireCommentText}
                        </Form.Text>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col style={{ textAlign: "center" }}>
                        <Button disabled={isSendBtnDisabled} variant="primary" size="lg" type="submit" onClick={submitFormHandler}>
                            Add
                        </Button>
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default AddCommentForm