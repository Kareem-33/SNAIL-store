import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {ArrowRight, LoaderCircle, LogInIcon } from "lucide-react";
import { motion } from "framer-motion";
import TextInput from "../components/TextInput";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const {user, loading, login} = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [])

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password) return toast.error("Email and password are required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true){
      login({email: formData.email, password: formData.password});
    }
  }

  return (
    <div className='flex flex-col justify-center sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='sm:mx-auto sm:w-full sm:max-w-md'
      >
        <h2 className="text-3xl font-extrabold mt-6 text-emerald-400 text-center">Log into you account</h2>
      </motion.div>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.2}}
        className="bg-gray-800 flex flex-col justify-center sm:p-6 lg:p-8 mt-6 w-fit m-auto rounded-md"
      >
        <div className='sm:mx-auto sm:w-100 sm:max-w-md'>
          <form onSubmit={handleSubmit} className='space-y-6' noValidate>
            <TextInput label="Email" icon="mail" placeholder="you@example.com" type="email" name="email" formData={formData} setFormData={setFormData}/>
            <TextInput label="Password" icon="lock" placeholder="••••••••" type="password" name="password" formData={formData} setFormData={setFormData}/>
            <button type="submit" className="p-3 w-full bg-emerald-600 rounded-md hover:cursor-pointer hover:bg-emerald-700 flex items-center justify-center transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600" disabled={loading}>
              {loading? (
                <>
                  <LoaderCircle className="animate-spin inline-block mr-2" size={20}/>
                  <span className="">Loading...</span>
                </>
              ):(
                <>
                  <LogInIcon size={20} className="inline-block mr-2"/>
                  <span className="">Log in</span>
                </>
              )}

            </button>
          </form>
        </div>
        <p className="text-center mt-6 text-sm text-gray-400">
            Doesn't have an account? {" "}
            <Link to="/signup" className="text-emerald-400 font-bold group">
              Signup here <ArrowRight className='inline h-4 w-4 group-hover:animate-pulse'/>
            </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage