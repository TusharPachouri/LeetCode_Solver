/* eslint-disable no-unused-vars */
import { Login } from "./components/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <BrowserRouter>
        {/* <Nav /> */}
        <div className="flex-grow w-full">
          {" "}
          {/* Adjusted padding for mobile */}
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/search/:search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<SignUp />} /> */} 
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
