import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/thunks/authThunk";

const Login = () => {
  const { role, token, error, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl p-10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl flex items-center justify-center">
              <span className="text-white font-black text-5xl">E</span>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center mb-2">Login</h2>
          {error && <div className="text-center text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-2xl px-6 py-4 outline-none text-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 py-5 rounded-2xl font-semibold text-xl hover:brightness-110 transition-all active:scale-95"
              >
                Sign In
              </button>

              <div className="text-center text-zinc-400">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-violet-400 font-medium hover:underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
