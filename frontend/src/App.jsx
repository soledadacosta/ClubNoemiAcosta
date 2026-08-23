import { useState } from "react";
import { ChevronLeft, AlertCircle, Eye, EyeOff, Mail, CheckCircle2 } from "lucide-react";

// Componente para la pantalla de Email Enviado
function EmailEnviado({ email, onVolverLogin }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-8 my-auto font-inter">
      <div className="w-16 h-16 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center text-[#d4ff00] mb-2 animate-bounce">
        <Mail className="w-8 h-8" />
      </div>

      <header className="flex flex-col gap-2">
        <span className="font-black text-[#d4ff00] text-[10px] tracking-[4px] uppercase font-inter">
          REVISÁ TU BANDEJA DE ENTRADA
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight font-barlow uppercase">
          ¡Correo Enviado!
        </h2>
      </header>

      <p className="text-white/70 text-sm leading-relaxed px-2 font-inter">
        Enviamos un enlace de recuperación a: <br />
        <span className="font-bold text-[#d4ff00]">{email || "tu correo electrónico"}</span>
      </p>

      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/60 flex items-start gap-2 text-left my-2 font-inter">
        <CheckCircle2 className="w-4 h-4 text-[#d4ff00] flex-shrink-0 mt-0.5" />
        <span>Si no ves el mensaje en unos minutos, revisá tu carpeta de Correo no deseado / Spam.</span>
      </div>

      <button
        type="button"
        onClick={onVolverLogin}
        className="w-full h-[54px] bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-black text-base tracking-[1.5px] rounded-xl transition-colors cursor-pointer mt-4 font-barlow uppercase"
      >
        VOLVER AL INICIO
      </button>
    </div>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");

  // Estados de Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Estados de Registro
  const [registroData, setRegistroData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    email: "",
    contrasena: "",
  });
  const [showRegistroPassword, setShowRegistroPassword] = useState(false);
  const [registroError, setRegistroError] = useState(false);

  // Estados de Recuperación
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryError, setRecoveryError] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError(true);
    } else {
      setLoginError(false);
      alert("¡Inicio de sesión exitoso!");
    }
  };

  const handleRegistroChange = (e) => {
    const { name, value } = e.target;
    setRegistroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(registroData).some((val) => !val.trim());
    if (hasEmptyFields) {
      setRegistroError(true);
    } else {
      setRegistroError(false);
      alert("¡Cuenta creada exitosamente!");
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) {
      setRecoveryError(true);
    } else {
      setRecoveryError(false);
      setCurrentScreen("emailEnviado");
    }
  };

  const inputStyle =
    "w-full h-[51px] px-4 bg-white/10 rounded-xl border text-white text-sm focus:outline-none transition-colors placeholder:text-white/30 font-inter";

  const labelStyle = "font-medium text-white/70 text-[10px] tracking-[2.2px] uppercase font-inter";

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-black p-4 font-inter">
      <section className="w-full max-w-[392px] min-h-[848px] flex flex-col justify-between p-6 relative bg-[#050508] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10 opacity-30"
          style={{ backgroundImage: "url('/image.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95 -z-10" />

        {/* ================= PANTALLA: LOGIN ================= */}
        {currentScreen === "login" && (
          <div className="flex flex-col gap-8 pt-12 my-auto">
            <header className="flex flex-col gap-2">
              <span className="font-black text-[#d4ff00] text-[10px] tracking-[4px] font-inter">
                BIENVENIDO A
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white font-barlow uppercase">
                CLUB <span className="text-[#d4ff00]">NOEMI ACOSTA</span>
              </h1>

              {loginError && (
                <div role="alert" className="mt-4 flex items-center gap-3 p-3 bg-[#df202e]/25 rounded-2xl border border-[#df202e]/30 text-[#df202e] text-sm animate-fade-in font-inter">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Completá todos los campos</span>
                </div>
              )}
            </header>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="usuario@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={`${inputStyle} ${loginError && !loginEmail ? "border-[#df202e]" : "border-[#383a3a] focus:border-[#d4ff00]"}`}
              />

              <div className="relative w-full">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`${inputStyle} pr-12 ${loginError && !loginPassword ? "border-[#df202e]" : "border-[#383a3a] focus:border-[#d4ff00]"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button 
                type="button"
                onClick={() => {
                  setRecoveryError(false);
                  setRecoveryEmail(loginEmail);
                  setCurrentScreen("recuperar");
                }} 
                className="text-right text-xs font-extrabold text-[#d4ff00] hover:underline w-fit ml-auto cursor-pointer font-inter"
              >
                ¿Olvidaste tu contraseña?
              </button>

              <button
                type="submit"
                className="w-full h-[54px] mt-2 bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-black text-base tracking-[1.5px] rounded-xl transition-colors cursor-pointer font-barlow uppercase"
              >
                INICIAR SESIÓN
              </button>
            </form>

            <div className="flex items-center my-2">
              <div className="flex-1 h-px bg-white/10" />
              <span className="px-3 text-xs text-white/20 font-inter">o</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="flex justify-center items-center gap-2 text-xs font-inter">
              <span className="text-white/40">¿No tenés cuenta?</span>
              <button
                type="button"
                onClick={() => {
                  setLoginError(false);
                  setRegistroError(false);
                  setRegistroData({
                    nombre: "",
                    apellido: "",
                    dni: "",
                    fechaNacimiento: "",
                    email: "",
                    contrasena: "",
                  });
                  setCurrentScreen("registro");
                }}
                className="font-black text-[#d4ff00] hover:underline tracking-wide cursor-pointer font-barlow uppercase text-sm"
              >
                COMENZAR →
              </button>
            </div>
          </div>
        )}

        {/* ================= PANTALLA: REGISTRO ================= */}
        {currentScreen === "registro" && (
          <div className="flex flex-col gap-6 pt-4">
            <button
              type="button"
              onClick={() => {
                setRegistroError(false);
                setCurrentScreen("login");
              }}
              className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-medium transition-colors w-fit cursor-pointer font-inter"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver
            </button>

            <header className="flex flex-col gap-3">
              <span className="font-black text-[#d4ff00] text-[10px] tracking-[4px] font-inter">
                NUEVA CUENTA
              </span>

              {registroError && (
                <div role="alert" className="flex items-center gap-3 p-3 bg-[#df202e]/25 rounded-2xl border border-[#df202e]/30 text-[#df202e] text-sm animate-fade-in font-inter">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Completá todos los campos</span>
                </div>
              )}
            </header>

            <form onSubmit={handleRegistroSubmit} noValidate className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nombre" className={labelStyle}>
                    NOMBRE *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={registroData.nombre}
                    onChange={handleRegistroChange}
                    className={`${inputStyle} ${registroError && !registroData.nombre ? "border-[#df202e]" : "border-white/20 focus:border-[#d4ff00]"}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="apellido" className={labelStyle}>
                    APELLIDO *
                  </label>
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    value={registroData.apellido}
                    onChange={handleRegistroChange}
                    className={`${inputStyle} ${registroError && !registroData.apellido ? "border-[#df202e]" : "border-white/20 focus:border-[#d4ff00]"}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="dni" className={labelStyle}>
                  DNI *
                </label>
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  value={registroData.dni}
                  onChange={handleRegistroChange}
                  className={`${inputStyle} ${registroError && !registroData.dni ? "border-[#df202e]" : "border-white/20 focus:border-[#d4ff00]"}`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="fechaNacimiento" className={labelStyle}>
                  FECHA DE NACIMIENTO *
                </label>
                <input
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={registroData.fechaNacimiento}
                  onChange={handleRegistroChange}
                  className={`${inputStyle} [color-scheme:dark] ${registroError && !registroData.fechaNacimiento ? "border-[#df202e]" : "border-white/20 focus:border-[#d4ff00]"}`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className={labelStyle}>
                  EMAIL *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={registroData.email}
                  onChange={handleRegistroChange}
                  className={`${inputStyle} ${registroError && !registroData.email ? "border-[#df202e]" : "border-white/20 focus:border-[#d4ff00]"}`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contrasena" className={labelStyle}>
                  CONTRASEÑA *
                </label>
                <div className="relative w-full">
                  <input
                    id="contrasena"
                    name="contrasena"
                    type={showRegistroPassword ? "text" : "password"}
                    value={registroData.contrasena}
                    onChange={handleRegistroChange}
                    placeholder="Mínimo 8 caracteres"
                    className={`${inputStyle} pr-12 ${registroError && !registroData.contrasena ? "border-[#df202e]" : "border-white/20 focus:border-[#d4ff00]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegistroPassword(!showRegistroPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showRegistroPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-[54px] mt-4 bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-black text-base tracking-[1.5px] rounded-xl transition-colors cursor-pointer font-barlow uppercase"
              >
                CREAR CUENTA
              </button>
            </form>
          </div>
        )}

        {/* ================= PANTALLA: RECUPERAR CONTRASEÑA ================= */}
        {currentScreen === "recuperar" && (
          <div className="flex flex-col gap-6 pt-4 my-auto">
            <button
              type="button"
              onClick={() => {
                setRecoveryError(false);
                setCurrentScreen("login");
              }}
              className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-medium transition-colors w-fit cursor-pointer font-inter"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver al inicio
            </button>

            <header className="flex flex-col gap-2">
              <span className="font-black text-[#d4ff00] text-[10px] tracking-[4px] font-inter">
                RECUPERAR ACCESO
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white font-barlow uppercase">
                ¿Olvidaste tu <span className="text-[#d4ff00]">contraseña?</span>
              </h2>
              <p className="text-white/60 text-xs leading-relaxed mt-1 font-inter">
                Ingresá tu correo electrónico registrado y te enviaremos las instrucciones para restablecerla.
              </p>

              {recoveryError && (
                <div role="alert" className="mt-2 flex items-center gap-3 p-3 bg-[#df202e]/25 rounded-2xl border border-[#df202e]/30 text-[#df202e] text-sm animate-fade-in font-inter">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Ingresá un correo válido</span>
                </div>
              )}
            </header>

            <form onSubmit={handleRecoverySubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="recoveryEmail" className={labelStyle}>
                  EMAIL REGISTRADO *
                </label>
                <input
                  id="recoveryEmail"
                  type="email"
                  placeholder="usuario@gmail.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className={`${inputStyle} ${recoveryError ? "border-[#df202e]" : "border-white/20 focus:border-[#d4ff00]"}`}
                />
              </div>

              <button
                type="submit"
                className="w-full h-[54px] mt-2 bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-black text-base tracking-[1.5px] rounded-xl transition-colors cursor-pointer font-barlow uppercase"
              >
                ENVIAR INSTRUCCIONES
              </button>
            </form>
          </div>
        )}

        {/* ================= PANTALLA: EMAIL ENVIADO ================= */}
        {currentScreen === "emailEnviado" && (
          <EmailEnviado 
            email={recoveryEmail} 
            onVolverLogin={() => {
              setRecoveryEmail("");
              setCurrentScreen("login");
            }} 
          />
        )}

      </section>
    </main>
  );
}