/** @format */

import React, {useEffect, useRef, useState} from "react";
import {Eye, EyeOff, Mail, Lock, User} from "lucide-react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginApi} from "../redux/slice/Auth_slice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({x: 0, y: 0});
  const animationFrameRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = ["#4F46E5", "#818CF8", "#38BDF8", "#22D3EE", "#A78BFA"];
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p, index) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * 3;
          p.y += Math.sin(angle) * 3;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const o = particlesRef.current[j];
          const dx = p.x - o.x;
          const dy = p.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.3;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {x: e.clientX, y: e.clientY};
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    const newData = {email, password};

    try {
      await dispatch(loginApi({newData, navigate})).unwrap();
    } catch (err) {
      setError(err?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full' />

      <div className='relative z-10 min-h-screen w-full flex items-center justify-center px-4'>
        <div className='w-full max-w-md'>
          <div className='bg-white backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-300 p-8'>
            <div className='flex flex-col items-center mb-8'>
              <div className='h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg animate-pulse'>
                <User className='h-8 w-8 text-white' />
              </div>
              <h1 className='text-3xl font-extrabold text-black tracking-tight'>
                Welcome Back
              </h1>
              <p className='text-gray-600 mt-1'>Please sign in to continue</p>
            </div>

            {error && (
              <div className='text-red-600 mb-4 text-sm text-center font-medium'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                  Email
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-blue-500' />
                  </div>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
                    placeholder='you@example.com'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-blue-500' />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
                    placeholder='••••••••'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5 text-blue-500 hover:text-blue-700' />
                    ) : (
                      <Eye className='h-5 w-5 text-blue-500 hover:text-blue-700' />
                    )}
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl'
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
