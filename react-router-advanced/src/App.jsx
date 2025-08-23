// import { Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Profile from "./pages/Profile";
// import BlogPost from "./pages/BlogPost";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <div>
//       <nav className="flex gap-4 p-4 bg-gray-200">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/profile">Profile</Link>
//         <Link to="/blog/1">Blog #1</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />

//         {/* ✅ Protected route for Profile */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/profile/*" element={<Profile />} />
//         </Route>

//         {/* ✅ Dynamic route for blog */}
//         <Route path="/blog/:id" element={<BlogPost />} />

//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import Post from "./components/Post";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected Profile with Nested Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Dynamic Route for blog posts */}
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
