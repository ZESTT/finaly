import axios from 'axios'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/UserContext'

export default function Login() {
  let {SetUserLogin}=useContext(userContext)
      let navigate = useNavigate()
         async function handleLogin(formValues) {
        await axios.post(`http://localhost:5000/api/auth/login`,formValues)
        .then((response)=>{
          SetUserLogin(response.data)
          localStorage.setItem('token',response.data.usertoken)
        })
        navigate('/')
        }

        let formik = useFormik(
          {
            initialValues:{
              email:'',
              password:''
            },
            onSubmit:handleLogin
          }
        )
    return (
    <>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit} >

        <h2 className='py-5 text-center font-bold text-2xl'> Login Now</h2>
   


     <div className="relative z-0 w-full mb-5 group">
      <input id="email" type="email" name="email" value={formik.values.email}  onChange={formik.handleChange} onBlur={formik.handleBlur}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
  </div>



    <div className="relative z-0 w-full mb-5 group">
      <input id="password" type="password" value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur}   name="password"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
  </div>

    <button type="submit" class="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

  </form>
    </>
  )
}
