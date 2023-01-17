import { Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NewPostForm from './components/NewPostForm'
import MainNavBar from "./components/MainNavBar.js";
import Home from "./components/Home.js"
import "./App.css"

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
        </Routes>
      </main>
      </div>
    )
  }
  
export default App;