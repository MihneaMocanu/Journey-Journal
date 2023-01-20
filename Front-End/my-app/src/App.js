import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewPostForm from "./components/NewPostForm";
import MainNavBar from "./components/MainNavBar.js";
import Home from "./components/Home.js";
import ForgotForm from "./components/ForgotForm.js";
import "./App.css";
import AccountForm from "./components/AccountForm.js";
import ModifyAccountForm from "./components/ModifyAccountForm.js";
import ExperienceList from "./components/ExperienceList.js";
import UserExperienceList from "./components/UserExperienceList.js";

function App() {
  return (
    <div>
      <MainNavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/newPost" element={<NewPostForm />} />
          <Route path="/forgotPassword" element={<ForgotForm />} />
          <Route path="/public" element={<ExperienceList />} />
          <Route path="/public/:word" element={<ExperienceList />}></Route>
          <Route path="/private" element={<UserExperienceList />} />
          <Route path="/account" element={<AccountForm />} />
          <Route path="/modifyAccount" element={<ModifyAccountForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
