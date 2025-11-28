import React, { useState } from 'react'
import { useAuth } from '../../Context/UserAuth';
import { Link } from 'react-router-dom';

interface Props {}

const RegisterPage = (props: Props) => {

  const{registerUser, user} = useAuth();
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

      const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);
    
        try {
          await registerUser(email, username, password,name);
        } catch (e) {
          setError('Invalid username or password');
        } finally {
          setLoading(false);
        }
      };

  return (
   
    <section className="bg-darkBlue">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register a new patient account
            </h1>
             {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>

               <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Full Name"
               value={name}  
                  onChange={(e) => setName(e.target.value)}  
                  
                />
      
              </div>
           
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
               value={email}  
                  onChange={(e) => setEmail(e.target.value)}  
                  
                />
      
              </div>
           
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
               value={username}  
                  onChange={(e) => setUsername(e.target.value)}  
                  
                />
      
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password" 
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={password}  
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

      

              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={loading} 
                  
              >
               {loading ? 'Creating account...' : 'Create!'}
               
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? 
                <Link to="/login"
                 
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  <a>
                   Sign in
                </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>




  );
}

export default RegisterPage