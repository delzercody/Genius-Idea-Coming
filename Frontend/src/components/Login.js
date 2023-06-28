import '../stylesheets/login.css'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import NavBar from './NavBar'
import { useEffect, useState } from 'react';

function Login({updateUser, user }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()

  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username : username, password : password}),
    }).then((r) => {
      // console.log(r)
      if (r.ok) {
        r.json().then((r) => updateUser(r))
        .then(navigate("/"));
      } else {
        r.json().then((err) => setErrors(err));
          window.alert("Invalid username or password")
      }
    });
  }

  return (
    <>
      <NavBar />
      <div className='login-body'>
        <div>
        <form 
        className='login-form'
        onSubmit={handleSubmit}>
          <div id="username-input">
            <label>Username</label>
            <input
              type = "text"
              name = "username"
              value = {username}
              onChange = {(e) => setUsername(e.target.value)}
            />
            </div>
            <div id="password-input">
            <label>Password</label>
            <input
              type = "password"
              name = "password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
            </div>
            <div id="submit-button">
              <button type="submit" value="Log In" className="button">
                Login
              </button>
            </div>
        </form>
        </div>
      </div>
    </>
  );
}
export default Login




// 	const navigate = useNavigate();

// 	const formSchema = yup.object().shape({
// 		username: yup.string().required("Please enter a username"),
// 		password: yup.string().required("Please enter a password"),
// 	});

// 	const form = useFormik({
// 		initialValues: {
// 			username: "",
// 			password: "",
// 		},
// 		validationSchema: formSchema,
// 		onSubmit: (values, actions) => {
// 			fetch( "http://127.0.0.1:5000/login", {
// 				method: "POST",
// 				headers: {
// 					"content-type": "application/json",
// 				},
// 				body: JSON.stringify(values),
// 			}).then((res) => {
// 				if (res.ok) {
// 					res.json().then((data) => {
// 						actions.resetForm();
// 						updateUser(data);
// 						navigate("/");
// 					});
// 				} else {
//           // res.json().then((err) => console.log(err));
//           window.alert("Invalid username or password")
// 				}
// 			});
// 		},
// 	});


//   return (
//     <>
//       <NavBar />
//       <div className='login-body'>
//         <div>
//           <form className='login-form'>
//             <label>Username:</label>
//             <input 
//               type='text'
//               name = 'username'
//               value = {form.values.name}
//               onChange={form.handleChange}
//               onBlur={form.handleBlur}
//             ></input>
//             <label>Password:</label>
//             <input 
//               type='text'
//               name = 'password'
//               value = {form.values.name}
//               onChange={form.handleChange}
//               onBlur={form.handleBlur}
//               ></input>
// 					    <input type="submit" value="Log In" className="button" />
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }