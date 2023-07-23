import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap"

const FileInput = ({ onChange }) => {
    const inputRef = useRef();
    const [filename, setFilename] = useState("");

    const onFileChange = e => {
        if (e.target.files[0]) setFilename(e.target.files[0].name);
        else setFilename("");
        onChange(e);
    };

    const activateInput = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type={"file"}
                name={"image"}
                style={{ display: "none" }}
                onChange={onFileChange}
                ref={inputRef}
            />
            <Form.Label>{"Image"}</Form.Label>
            <Form.Control
                type={"text"}
                value={filename}
                onClick={activateInput}
                readOnly
            />
            <Button onClick={activateInput} className="mt-2">
                Browse
            </Button>
        </>
    )
}

export default FileInput