import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function PostEdit() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = () => {
        axios.get(`/posts/${id}/edit`).then((response) => {
            setTitle(response.data.title);
            setBody(response.data.body);
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (title === "" || body === "") {
            window.alert("Enter Value ....");
        } else {
            let formData = {
                title: title,
                body: body,
            };
            axios.put(`/posts/${id}`, formData).then((response) => {
                console.log("Successfully Edited!");
                navigate("/home");
            });
        }
    };

    return (
        <div className="container">
            <Link className="btn btn-sm btn-success" to={"/home"}>
                Home
            </Link>
            <hr />
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="titleID" className="form-label">
                        Title
                    </label>
                    <input
                        name="title"
                        type="text"
                        className="form-control"
                        id="titleID"
                        placeholder="post title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title || "empty"}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bodyID" className="form-label">
                        Body
                    </label>
                    <textarea
                        name="body"
                        className="form-control"
                        id="bodyID"
                        rows="3"
                        onChange={(e) => setBody(e.target.value)}
                        value={body || "empty"}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
}
