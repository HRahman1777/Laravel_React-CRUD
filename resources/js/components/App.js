import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Form from "./Form";
import PostEdit from "./PostEdit";
import Home from "./Home";

export default class Create extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/addPosts" element={<Form />} />
                        <Route path="/editPost/:id" element={<PostEdit />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}
