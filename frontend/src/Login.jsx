import React, { useState } from "react";

export const Login = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Completá tu email y contraseña.");
      return;
    }

    setMessage("Inicio de sesión enviado.");
  };

  const handleForgotPassword = () => {
    setMessage("Te enviaremos instrucciones para recuperar tu contraseña.");
  };

  return (
    <main className="min-h-screen w-full bg-[#000001] flex items-center justify-center p-4">
      <section
        className="w-full max-w-[392px] min-h-[700px] flex flex-col justify-between items-center bg-[#050508] rounded-3xl p-6 relative overflow-hidden border border-[#ffffff1a] shadow-2xl"
        aria-labelledby="login-title"
      >
        {/* Fondo con Degradado */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.65)_50%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Header */}
          <header className="flex flex-col w-full items-start mt-6 mb-8 gap-1">
            <p className="text-[#d4ff00] font-black text-[10px] tracking-[4px] uppercase">
              BIENVENIDO A
            </p>
            <h1
              id="login-title"
              className="font-black text-[38px] leading-tight tracking-tight"
            >
              <span className="text-white">CLUB </span>
              <span className="text-[#d4ff00]">NOEMI ACOSTA</span>
            </h1>
            <p className="text-[#ffffff61] text-[13px] tracking-wide mt-1">
              Gestión de espacios deportivos
            </p>
          </header>

          {/* Formulario */}
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Campo Email */}
            <div className="relative w-full">
              <input
                className="w-full h-[52px] bg-[#ffffff14] border border-[#ffffff24] focus:border-[#d4ff00] text-white placeholder:text-[#ffffff4c] text-sm rounded-xl px-4 focus:outline-none transition-colors"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div className="relative w-full flex items-center">
              <input
                className="w-full h-[52px] bg-[#ffffff14] border border-[#ffffff24] focus:border-[#d4ff00] text-white placeholder:text-[#ffffff4c] text-sm rounded-xl pl-4 pr-12 focus:outline-none transition-colors"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
                required
              />
              <button
                className="absolute right-4 text-[#ffffff61] hover:text-[#d4ff00] transition-colors p-1"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>

            {/* Olvidaste tu contraseña */}
            <div className="flex justify-end w-full mt-1">
              <button
                className="text-[#d4ff00] font-extrabold text-xs tracking-wide hover:underline bg-transparent border-0 cursor-pointer"
                type="button"
                onClick={handleForgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              className="w-full h-[54px] bg-[#d4ff00] hover:bg-[#c0e600] active:scale-[0.99] text-black font-black text-[15px] tracking-[1.5px] rounded-xl cursor-pointer transition-all mt-2 uppercase"
              type="submit"
            >
              INICIAR SESIÓN
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center justify-center w-full my-6 relative">
            <div className="w-full h-px bg-[#ffffff1a]" />
            <span className="absolute bg-[#050508] px-3 text-[#ffffff33] text-xs">
              o
            </span>
          </div>

          {/* Registro */}
          <div className="flex items-center justify-center gap-2 w-full text-xs">
            <span className="text-[#ffffff57]">¿No tenés cuenta?</span>
            <button
              className="text-[#d4ff00] font-black tracking-wide hover:underline bg-transparent border-0 cursor-pointer"
              type="button"
              onClick={onNavigateToRegister}
            >
              COMENZAR →
            </button>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div className="mt-4 p-3 w-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 rounded-xl text-[#d4ff00] text-xs text-center font-medium">
              {message}
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default Login;
