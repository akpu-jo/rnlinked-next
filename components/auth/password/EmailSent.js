import React from 'react';

export default function EmailSent() {
    return (
        <div>
            <div className="mb-0 px-6 pt-2">
                <div className="bg-gray-200 my-6 rounded-xl w-32 h-32 flex mx-auto content-center">

                    <img
                        className="w-38 h-30"
                        alt="..."
                        src="/mailSent.svg"
                    />
                </div>
                <div className="text-center mb-3">
                    <h6 className="text-gray-600 dark:text-elm-50 font-bold">
                        Check your email
                    </h6>
                </div>
            </div>
            <div className="text-gray-500 dark:text-elephant-100 text-sm text-center mb-3 font-bold px-4 lg:px-10 py-10 pt-0">
                <small>We have sent a password recovery instruction to your email</small>
            </div>
        </div>
    )
}
