import { Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NewPostForm from './components/NewPostForm'
import MainNavBar from "./components/MainNavBar.js";
import Home from "./components/Home.js"
import ForgotForm from "./components/ForgotForm.js"
import "./App.css"
import ExperienceList from "./components/ExperienceList";
import UserExperienceList from "./components/UserExperienceList";

function App () {
    return (
      <div>
      <MainNavBar />
      <main>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/login" element = {<LoginForm />} />
          <Route path="/register" element = {<RegisterForm />}/>
          <Route path="/newPost" element = {<NewPostForm />}/>
          <Route path="/forgotPassword" element = {<ForgotForm />}/>
          <Route path="/public" element = {<ExperienceList />}/>
          <Route path="/private" element = {<UserExperienceList />}/>
        </Routes>
      </main>
      </div>
    )
  }
  
export default App;