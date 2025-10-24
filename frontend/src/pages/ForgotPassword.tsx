import { FaRegEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center py-10 md:py-20">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center gap-3 justify-center mb-6 bg-primary-100 py-2 rounded-md">
          <FaRegEnvelope size={25} />
          <h1 className="text-xl font-semibold">Forgot your password?</h1>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Your email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <button
            type="submit"
            className="font-bold w-full bg-primary-200 py-2 rounded-md hover:bg-primary-100 transition-colors"
          >
            Send
          </button>
        </form>

        {/* Back to login */}
        <p className="mt-4 text-center text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-primary-200 hover:underline font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
