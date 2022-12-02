import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./common/auth";
import Header from './containers/Header'
import Footer from './containers/Footer'

import { About, Home, Property, Agent, Blog, Contact, Error, Profile, ViewProperty, AgentProfile } from "./links";
import {ListProperty, LoginForm, RegisterAgent, SignupForm } from './forms';
import { AgentProperty} from "./containers"


function App() {

  return (
    <div className="">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="property" element={<Property />} />
          <Route path="agent" element={<Agent />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="profile" element={<Profile />} >
              <Route path="listProperty" element={<ListProperty />} />
              <Route index element={<AgentProperty />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="signupForm" element={<SignupForm />} />
          <Route path="agentForm" element={<RegisterAgent />} />
          <Route path="loginForm" element={<LoginForm />} />
          <Route path="view_property" element={<ViewProperty />} />
          <Route path="listProperty" element={<ListProperty />} />
          <Route path="agent_profile" element={<AgentProfile />} />

        </Routes>
        <Footer/>
      </AuthProvider>
      
    </div>
  )
}

export default App
