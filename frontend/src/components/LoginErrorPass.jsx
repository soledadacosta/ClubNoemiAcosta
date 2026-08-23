import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export const LoginErrorPass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-black p-4">
      <section className="w-full max-w-[392px] min-h-[848px] flex flex-col justify-between p-6 relative bg-[#050508] rounded-2xl overflow-hidden">
        
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/assets/hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/97 -z-10" />

        <div className="flex flex-col gap-8 pt-12">
          <header className="flex flex-col gap-2">
            <span className="font-black text-[#d4ff00] text-[10px] tracking-[4px]">
              BIENVENIDO A
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white">
              CLUB <span className="text-[#d4ff00]">NOEMI ACOSTA</span>
            </h1>

            <div role="alert" className="mt-4 flex items-center gap-3 p-3 bg-[#df202e]/25 rounded-2xl border border-[#df202e]/30 text-[#df202e] text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Completá todos los campos</span>
            </div>
          </header>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="usuario@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[51px] px-4 bg-white/10 rounded-xl border border-[#383a3a] text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#d4ff00]"
            />

            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[51px] pl-4 pr-12 bg-white/10 rounded-xl border border-[#6c141a] text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#df202e]"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <a href="#recuperar" className="text-right text-xs font-extrabold text-[#d4ff00] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>

            <button
              type="submit"
              className="w-full h-[54px] mt-2 bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-black text-[15px] tracking-[1.5px] rounded-xl transition-colors"
            >
              INICIAR SESIÓN
            </button>
          </form>

          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-3 text-xs text-white/20">o</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex justify-center items-center gap-2 text-xs">
            <span className="text-white/40">¿No tenés cuenta?</span>
            <a href="#comenzar" className="font-black text-[#d4ff00] hover:underline tracking-wide">
              COMENZAR →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginErrorPass;