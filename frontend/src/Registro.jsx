import React, { useState } from "react";

const initialFormData = {
  nombre: "",
  apellido: "",
  dni: "",
  fechaNacimiento: "",
  email: "",
  contrasena: "",
};

const inputStyle =
  "w-full h-[50px] px-4 bg-[#ffffff14] border border-[#ffffff24] focus:border-[#d4ff00] text-white text-sm rounded-xl focus:outline-none transition-colors placeholder:text-[#ffffff40]";

const labelStyle =
  "block text-[#ffffff5c] text-[10px] font-medium tracking-[2.2px] uppercase mb-1.5";

export const Registro = ({ onNavigateToLogin }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    window.dispatchEvent(
      new CustomEvent("registro:submit", { detail: formData })
    );
  };

  return (
    <main className="min-h-screen w-full bg-[#000001] flex items-center justify-center p-4">
      <section
        className="w-full max-w-[420px] bg-[#050508] rounded-3xl p-6 relative border border-[#ffffff1a] shadow-2xl overflow-hidden"
        aria-labelledby="registro-title"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.72)_50%,rgba(0,0,0,0.97)_100%)] pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full flex flex-col">
          {/* Botón Volver al Login */}
          <button
            className="flex items-center gap-2 text-[#ffffff66] hover:text-[#d4ff00] text-xs transition-colors mb-4 w-fit cursor-pointer"
            type="button"
            onClick={handleBack}
            aria-label="Volver al inicio de sesión"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            <span>Volver</span>
          </button>

          <header className="mb-6">
            <p className="text-[#d4ff00] font-black text-[10px] tracking-[4px] uppercase mb-1">
              NUEVA CUENTA
            </p>
            <h1
              id="registro-title"
              className="font-black text-[38px] leading-tight tracking-tight"
            >
              <span className="text-white">CREAR </span>
              <span className="text-[#d4ff00]">CUENTA</span>
            </h1>
          </header>

          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyle} htmlFor="nombre">
                  NOMBRE *
                </label>
                <input
                  className={inputStyle}
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Juan"
                  autoComplete="given-name"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className={labelStyle} htmlFor="apellido">
                  APELLIDO *
                </label>
                <input
                  className={inputStyle}
                  id="apellido"
                  name="apellido"
                  type="text"
                  placeholder="Pérez"
                  autoComplete="family-name"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelStyle} htmlFor="dni">
                DNI *
              </label>
              <input
                className={inputStyle}
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                placeholder="31.234.567"
                autoComplete="off"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelStyle} htmlFor="fechaNacimiento">
                FECHA DE NACIMIENTO *
              </label>
              <input
                className={`${inputStyle} [color-scheme:dark]`}
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                autoComplete="bday"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelStyle} htmlFor="email">
                EMAIL *
              </label>
              <input
                className={inputStyle}
                id="email"
                name="email"
                type="email"
                placeholder="juan@email.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelStyle} htmlFor="contrasena">
                CONTRASEÑA *
              </label>
              <div className="relative flex items-center">
                <input
                  className={`${inputStyle} pr-12`}
                  id="contrasena"
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  minLength={8}
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                />
                <button
                  className="absolute right-4 text-[#ffffff61] hover:text-[#d4ff00] transition-colors p-1"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </button>
              </div>
            </div>

            <button
              className="w-full h-[52px] bg-[#d4ff00] hover:bg-[#c0e600] active:scale-[0.99] text-black font-black text-[15px] tracking-[1.5px] rounded-xl cursor-pointer transition-all uppercase mt-3"
              type="submit"
            >
              CREAR CUENTA
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Registro;
