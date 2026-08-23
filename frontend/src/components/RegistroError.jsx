import { useState } from "react";
import { ChevronLeft, AlertCircle, Eye, EyeOff } from "lucide-react";

const initialFormData = {
  nombre: "Juan",
  apellido: "Pérez",
  dni: "31.234.567",
  fechaNacimiento: "",
  email: "juan@email.com",
  contrasena: "",
};

export const RegistroError = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputStyle =
    "w-full h-[51px] px-4 bg-white/10 rounded-xl border border-[#701819] text-white/40 text-sm focus:outline-none focus:border-[#df202e] transition-colors";

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-black p-4">
      <section className="w-full max-w-[392px] min-h-[848px] flex flex-col justify-between p-6 relative bg-[#050508] rounded-2xl overflow-hidden">
        
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/assets/hero.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95 -z-10" />

        <div className="flex flex-col gap-6 pt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-medium transition-colors w-fit"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver
          </button>

          <header className="flex flex-col gap-3">
            <span className="font-black text-[#d4ff00] text-[10px] tracking-[4px]">
              NUEVA CUENTA
            </span>

            <div role="alert" className="flex items-center gap-3 p-3 bg-[#df202e]/25 rounded-2xl border border-[#df202e]/30 text-[#df202e] text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Completá todos los campos</span>
            </div>
          </header>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nombre" className="font-medium text-[#701819] text-[10px] tracking-[2.2px]">
                  NOMBRE *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="apellido" className="font-medium text-[#701819] text-[10px] tracking-[2.2px]">
                  APELLIDO *
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="dni" className="font-medium text-[#701819] text-[10px] tracking-[2.2px]">
                DNI *
              </label>
              <input
                id="dni"
                name="dni"
                type="text"
                value={formData.dni}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="fechaNacimiento" className="font-medium text-[#701819] text-[10px] tracking-[2.2px]">
                FECHA DE NACIMIENTO *
              </label>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className={`${inputStyle} [color-scheme:dark]`}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-medium text-[#701819] text-[10px] tracking-[2.2px]">
                EMAIL *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contrasena" className="font-medium text-[#701819] text-[10px] tracking-[2.2px]">
                CONTRASEÑA *
              </label>
              <div className="relative w-full">
                <input
                  id="contrasena"
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  value={formData.contrasena}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className={`${inputStyle} pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[54px] mt-4 bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-black text-[15px] tracking-[1.5px] rounded-xl transition-colors"
            >
              CREAR CUENTA
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegistroError;