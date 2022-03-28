import React, { useState } from 'react'
import EmailOpen from './EmailOpen'
import EmailSent from './EmailSent'

export const PasswordReset = ({ open, onClose, openSignIn }) => {
  const [success, setSuccess] = useState(false)
  if (!open) return null
  return (
    <>
    <div onClick={onClose} className="fixed z-20 inset-0 bg-elephant-50 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-80 " />
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-30 bg-primary-springWood dark:bg-slate-800 rounded-lg w-4/5 sm:w-3/5 md:w-1/3">
        <div className="flex justify-end text-xl p-4 dark:text-slate-400 "> <button onClick={onClose}> X</button></div>
        <div className="px-4 pb-8 sm:px-6 md:px-8 ">
            {success ? <EmailSent /> : <EmailOpen />}
            <form onSubmit={''}>
                <div className="relative w-full mb-3 text-elephant-400 dark:text-elephant-100 ">
                    <label
                        className="block uppercase text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Email
                    </label>
                    <input
                        aria-label="Enter your email address"
                        type="email"
                        // ref={emailRef}
                        className="px-3 py-3 placeholder-elephant-200 text-elephant-400 dark:bg-slate-300 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email"
                    />
                </div>

                {/* {error && <div className="text-white px-6  border-0 rounded relative mb-4 bg-red-400">
            <span className="inline-block align-middle mr-8">
                <p><small>{error}</small></p>
            </span>
        </div>} */}

                <div className="text-center mt-6">
                    <button
                        // disabled={loading}
                        className="bg-elm-900 text-secondary-alto active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
            <div className=" text-center dark:text-elephant-100 text-gray-800">
                <small className="">Remember password? <button onClick={openSignIn}>Sign in </button></small>
            </div>
        </div>
    </div>
</>
  )
}
