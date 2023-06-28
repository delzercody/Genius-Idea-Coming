import { useEffect, useState } from 'react';
import Home from './Home'
import Login from './Login'

function App() {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    getUser()
  }, []
  );

  const getUser = () => {
    fetch('http://127.0.0.1:5000/authorized-session' )
    .then(r => {
      if(r.ok){
        r.json().then(data => {
          setUser(data)
        })
      } else {
        setUser(null)
      }
    })
  }
  function updateUser(user){
    setUser(user)
  }

  return (
    <div> 
      <Login 
        updateUser = {updateUser}
        user = {user}
        />
    </div>
  )
}

export default App;
