import '../stylesheets/login.css'
import NavBar from './NavBar'

function Login() {
  return (
    <>
      <NavBar />
      <div className='login-body'>
        <div>
          <form className='login-form'>
            <label>Username:</label>
            <input type='text'></input>
            <label>Password:</label>
            <input type='text'></input>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login