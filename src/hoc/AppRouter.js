import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Home from "../components/pages/Home";
import Tasks from "../components/pages/Tasks";
import Session from "../components/pages/Session";
import SignIn from "../components/pages/SignIn";
import AuthRequired from "./AuthRequired";
import Materials from "../components/pages/Materials";
import SubjectModule from "../components/pages/SubjectModule";
import AddTaskForm from "../components/ui/form/AddTaskForm";
import AddSessionForm from "../components/ui/form/AddSessionForm";
import AddDocForm from "../components/ui/form/AddDocForm";
import AddSubjectForm from "../components/ui/form/AddSubjectForm";
import RegisterForm from "../components/ui/form/RegisterForm";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="tasks"
          element={
            <AuthRequired>
              <Tasks />
            </AuthRequired>
          }
        />
        <Route
          path="/tasks/:module"
          element={
            <AuthRequired>
              <SubjectModule />
            </AuthRequired>
          }
        />
        <Route
          path="/tasks/:module/add"
          element={
            <AuthRequired>
              <AddTaskForm />
            </AuthRequired>
          }
        />
        <Route
          path="materials"
          element={
            <AuthRequired>
              <Materials />
            </AuthRequired>
          }
        />
        <Route
          path="/materials/add"
          element={
            <AuthRequired>
              <AddDocForm />
            </AuthRequired>
          }
        />
        <Route
          path="session"
          element={
            <AuthRequired>
              <Session />
            </AuthRequired>
          }
        />
        <Route
          path="/session/add"
          element={
            <AuthRequired>
              <AddSessionForm />
            </AuthRequired>
          }
        />
        <Route
          path="/subjects/add"
          element={
            <AuthRequired>
              <AddSubjectForm />
            </AuthRequired>
          }
        />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="*" element />
      </Route>
    </Routes>
  );
};

export default AppRouter;
