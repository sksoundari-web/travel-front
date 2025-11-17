import React, { useEffect, useState } from "react"
import PasswordInput from "../../components/PasswordInput"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import { useDispatch, useSelector } from "react-redux"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { loading, currentUser } = useSelector((state) => state.user)

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter your name.")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter your password.")
      return
    }

    setError(null)

    // SignUp API call
    try {
      const response = await axiosInstance.post("/auth/signup", {
        username: name,
        email,
        password,
      })

      // handle successful sign-up response
      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/")
    }
  }, [currentUser])

  return (
     <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=1600')",
    }}
  >
    {/* Dark blur overlay */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    {/* Signup Card */}
    <div className="relative z-10 bg-white/90 shadow-2xl rounded-2xl w-[420px] p-10 text-center backdrop-blur-xl">

      {/* Circle Top Banner */}
      <div className="w-36 h-36 mx-auto -mt-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
        <img
          src="https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-6">Create Your Account</h2>

      <form onSubmit={handleSignUp}>
        {/* Name */}
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error */}
        {error && <p className="text-red-600 text-xs mt-2">{error}</p>}

        {/* Sign Up Button */}
        {loading ? (
          <p className="animate-pulse w-full text-center bg-black/20 text-black py-3 rounded-lg mt-4">
            LOADING...
          </p>
        ) : (
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg mt-5 hover:bg-gray-900 transition"
          >
            SIGN UP
          </button>
        )}

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login Here
          </span>
        </p>
      </form>
    </div>
  </div>
  )
}

export default SignUp
