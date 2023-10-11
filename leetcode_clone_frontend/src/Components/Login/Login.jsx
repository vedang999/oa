// import React, { useState } from "react";
// import axios from "axios";
import { backendUrl } from "../constants.js";
// import "./Login.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
// 		console.log(email,password);
//       const response = await axios.post(`${backendUrl}/login`, {
//         email: email,
//         password: password,
//       });
// console.log( response.data.token);
//       localStorage.setItem("token", response.data.token);
//       navigate("/problems");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div id="login" className="flex-col">
//       <h1>Login</h1>
//       <div className="signup-form">
//         <div className="subform">
//           <label htmlFor="email">Email: </label>
//           <br />
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             name="email"
//             placeholder="Your Email"
//           />
//         </div>
//         <div className="subform">
//           <label htmlFor="password">Password: </label>
//           <br />
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             name="password"
//             placeholder="Your Password"
//           />
//         </div>
//         <button type="submit" id="test" onClick={handleLogin}>
//           Login
//         </button>
//         <p className="forgot-password text-right">
//           New User? <a href="/signup">Signup</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/login`, formData);
      console.log(response.data); // Successful login message

      // Save the JWT token in local storage upon successful login
      localStorage.setItem('auth-token', response.data.token);

      // Redirect to the profile page upon successful login
      // history.push('/profile');
    } catch (error) {
      console.error(error.response.data); // Login error message
    }
  };


  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
