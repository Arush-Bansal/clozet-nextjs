"use client";

import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Background soft moving gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] animate-blob animation-delay-2000" />
      </div>
      
      <div className="relative flex flex-col items-center gap-10">
        {/* Main Logo Animation */}
        <div className="relative">
          {/* Pulsing ring */}
          <div className="absolute -inset-8 rounded-full border border-primary/10 animate-[ping_3s_infinite]" />
          <div className="absolute -inset-16 rounded-full border border-primary/5 animate-[ping_3s_infinite_1s]" />
          
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer spinning ring with gradient */}
            <div className="absolute inset-0 rounded-[2.5rem] border-4 border-transparent border-t-primary border-r-primary/40 animate-[spin_2s_linear_infinite]" />
            
            {/* Inner pulsing square with rounded corners */}
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center animate-pulse">
               <span className="text-4xl font-serif font-bold text-primary">C</span>
            </div>
          </div>
        </div>

        {/* Brand and Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <div className="overflow-hidden">
            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight animate-[slide-up_0.8s_ease-out]">
              clozet.life
            </h2>
          </div>
          <p className="text-sm font-medium text-gray-400 tracking-widest uppercase">
            Loading your experience{dots}
          </p>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-56 h-[3px] bg-gray-100 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 bg-primary animate-[progress-flow_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes progress-flow {
          0% { left: -40%; width: 40%; }
          50% { left: 40%; width: 60%; }
          100% { left: 100%; width: 40%; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
