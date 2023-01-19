import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NewPostForm from "./components/NewPostForm";
import MainNavBar from "./components/MainNavBar.js";
<<<<<<< HEAD
import Home from "./components/Home.js";
import ForgotForm from "./components/ForgotForm.js";
import "./App.css";
import AccountForm from "./components/AccountForm.js";
import ModifyAccountForm from "./components/ModifyAccountForm.js";
=======
import Home from "./components/Home.js"
import ForgotForm from "./components/ForgotForm.js"
import "./App.css"
import ExperienceList from "./components/ExperienceList";
import UserExperienceList from "./components/UserExperienceList";
>>>>>>> f259e25156f32ea96823923cbf2bd4e702286620

function App() {
  return (
    <div>
      <MainNavBar />
      <main>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/newPost" element={<NewPostForm />} />
          <Route path="/forgotPassword" element={<ForgotForm />} />
          <Route path="/account" element={<AccountForm />} />
          <Route path="/modifyAccount" element={<ModifyAccountForm />} />
=======
          <Route path="/" element = {<Home />} />
          <Route path="/login" element = {<LoginForm />} />
          <Route path="/register" element = {<RegisterForm />}/>
          <Route path="/newPost" element = {<NewPostForm />}/>
          <Route path="/forgotPassword" element = {<ForgotForm />}/>
          <Route path="/public" element = {<ExperienceList />}/>
          <Route path="/private" element = {<UserExperienceList />}/>
>>>>>>> f259e25156f32ea96823923cbf2bd4e702286620
        </Routes>
      </main>
    </div>
  );
}

export default App;
