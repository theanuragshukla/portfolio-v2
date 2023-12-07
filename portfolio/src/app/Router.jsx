import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Layout from "./layouts/Layout";
import Links from "./components/Links";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import AddBlog from "./components/AddBlog";
import Admin from "./components/Admin";

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/links" element={<Links />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/new" element={<AddBlog />} />
        <Route path="/blog/edit/:id" element={<AddBlog edit />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
