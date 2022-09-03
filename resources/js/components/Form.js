import React from "react";
import { Link } from "react-router-dom";

class Form extends React.Component {
    state = {
        title: "",
        body: "",
        allData: [],
    };

    handleFormInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.title === "" || this.state.body === "") {
            window.alert("Enter Value ....");
        } else {
            let formData = {
                title: this.state.title,
                body: this.state.body,
            };
            //console.log(formData);
            axios.post("/posts", formData).then((response) => {
                console.log("from handle submit", response);

                this.setState({
                    allData: [response.data, ...this.state.allData],
                });
                // then clear the value of textarea
                this.setState({
                    title: "",
                    body: "",
                });
            });
        }
    };

    renderAllData = () => {
        return this.state.allData.map((post) => (
            <div key={post.id} className="media">
                <div className="media-body">
                    <p>
                        {post.title}
                        {" - "}
                        <Link
                            className="btn btn-sm btn-success"
                            to={`/editPost/${post.id}`}
                        >
                            Edit
                        </Link>
                        {" / "}
                        <button
                            onClick={() => this.handleDelete(post.id)}
                            className="btn btn-sm btn-warning float-right"
                        >
                            Delete
                        </button>
                    </p>
                </div>
            </div>
        ));
    };

    componentWillMount() {
        axios.get("/posts").then((response) => {
            //console.log(response.data);
            this.setState({
                allData: [...response.data],
            });
        });
    }

    handleDelete = (id) => {
        // remove from local state
        //console.log(id);
        const isNotId = (post) => post.id !== id;
        const updatedAllData = this.state.allData.filter(isNotId);
        this.setState({ allData: updatedAllData });
        axios.delete(`/posts/${id}`);
    };

    render() {
        const { title, body } = this.state;
        return (
            <div className="container">
                <Link className="btn btn-sm btn-success" to={"/home"}>
                    Home
                </Link>
                <hr />
                <form onSubmit={this.handleFormSubmit}>
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
                            onChange={this.handleFormInput}
                            value={title}
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
                            onChange={this.handleFormInput}
                            value={body}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
                <hr />
                <p>
                    AllData: <br />
                </p>
                {this.renderAllData()}
            </div>
        );
    }
}

export default Form;
