import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Dashboard from '@/components/dashboard'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Read from localStorage to set the initial loggedIn state
    const loggedInState = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggedInState) {
      setLoggedIn(true);
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "password") {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', true);
      console.log("log in success");
    } else {
      console.log("Error invalid credentials");
      alert("Error invalid credentials");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', false);
  };

  return (
    <>
      <Head>
        <title>Techverse Dashboard</title>
        <meta name="description" content="techverse wireless monitoring service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loggedIn ? (
        <Dashboard handleLogout={handleLogout}></Dashboard>
      ) : (
        <div className='loginWrapper'>

          <form onSubmit={handleLogin}>
            <h2>Techverse Dashboard - Login</h2>

            <label>
              Username:
            </label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />

            <label>
              Password:
            </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Login</button>
          </form>
        </div>
      )
      }
    </>
  )
}
