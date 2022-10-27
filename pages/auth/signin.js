import React from "react";

const Signin = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isInvalid = false;
  
    const handleSignin = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // const newUser = userCredential.user;
          setLoading(false);
          return router.replace("/");
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
          toast.error(error.message);
        });
    };
  return (
    <>
      <section className=" mt-28 sm:mt-36 md:mt-52 mb-3 mx-auto w-10/12 sm:w-3/5 md:w-2/5  lg:w-1/3">
        <form onSubmit={handleSignin}>
          <h3 className="text-2xl font-bold mb-4 tracking-wider">Sign In.</h3>
          <div className="pb-4">
            <label className="block text-base text-gray-600 font-bold md:pb-1">
              Email
            </label>
            <input
              aria-label="Enter your email address"
              type="email"
              className="px-3 py-3 w-full rounded-sm text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="pb-2">
            <div className="flex justify-between items-end md:pb-1">
              <label className="block text-base text-gray-600 font-bold">
                Password
              </label>
              <Link href="/forgot-password">
                <a className="text-indigo-500 active:text-indigo-400 hover:text-indigo-600 text-sm">
                  Forgot Password
                </a>
              </Link>
            </div>
            <input
              aria-label="Enter your password"
              type="password"
              className="px-3 py-3 w-full rounded-sm text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          {error && (
            <p className=" text-center text-sm text-red-400">
              <small>{error}</small>
            </p>
          )}
          <div className=" pt-3">
            <button
              disabled={isInvalid}
              className={`bg-blue-800 bg-opacity-90 text-gray-50 active:bg-opacity-40 hover:bg-opacity-80 text-base font-bold px-6 py-3 w-full rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
              type="submit"
            >
              {loading ? "Processing..." : "Sign In"}{" "}
            </button>
          </div>
        </form>
        <p className="text-gray-800 text-sm text-center py-6">
          Not a member?
          <Link href="/signup">
            <a className="pl-1 text-indigo-500 active:text-indigo-400 hover:text-indigo-600 font-bold">
              Sign up now
            </a>
          </Link>
        </p>
      </section>
    </>
  );
};

export default Signin;
