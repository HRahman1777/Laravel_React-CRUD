import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
    state = {
        allData: [],
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

    componentDidMount() {
        axios.get("/posts").then((response) => {
            //console.log(response.data);
            this.setState({
                allData: [...response.data],
            });
        });
    }

    handleDelete(id) {
        const isNotId = (post) => post.id !== id;
        const updatedAllData = this.state.allData.filter(isNotId);
        this.setState({ allData: updatedAllData });
        axios.delete(`/posts/${id}`);
    }

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header text-center">
                                    <h3>All Post</h3>
                                </div>
                                <div className="card-body">
                                    <p>
                                        AllData: <br />
                                    </p>
                                    {this.renderAllData()}
                                </div>
                                <div className="card-footer">
                                    <Link
                                        className="btn btn-sm btn-success"
                                        to={"/addPosts"}
                                    >
                                        Create Post
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
