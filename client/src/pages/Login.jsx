import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phone === "7666817037") {
      setStep(2);
    } else {
      alert("Invalid phone number ❌");
    }
  };

  const handleVerify = () => {
    if (otp === "7439") {
      localStorage.setItem("isAuth", "true");
      navigate("/admin");
    } else {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Premium Card */}
        <div className="group p-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition">

          <div className="bg-[#0b0b0f]/95 backdrop-blur-xl rounded-2xl p-8 space-y-6">

            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Admin Login
            </h1>

            {/* STEP 1: PHONE */}
            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 focus:border-cyan-400 outline-none"
                />

                <button
                  onClick={handleSendOtp}
                  className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition"
                >
                  Send OTP
                </button>
              </>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-white/20 focus:border-purple-400 outline-none"
                />

                <button
                  onClick={handleVerify}
                  className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
                >
                  Verify & Login
                </button>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;