import React from 'react';

export default function EmailEnviado({ email = "usuario@email.com", onVolver, onVolverLogin }) {
  return (
    <div data-layer="Email enviado" className="EmailEnviado w-96 h-[848px] bg-black inline-flex flex-col justify-start items-start">
      <div data-layer="App" className="App w-96 h-[847.73px] max-w-96 min-h-[847.73px] bg-zinc-950 flex flex-col justify-start items-start overflow-hidden">
        <div data-layer="Container" className="Container self-stretch h-[847.73px] min-h-[847.73px] bg-zinc-950 blur-[0px] flex flex-col justify-start items-start">
          <div data-layer="PhotoBg" className="Photobg self-stretch h-[847.73px] min-h-[847.73px] relative overflow-hidden">
            
            {/* Imagen de fondo y Gradiente */}
            <div data-layer="Container" className="Container w-96 h-[847.73px] left-0 top-0 absolute inline-flex flex-col justify-start items-start">
              <img data-layer="Image" className="Image self-stretch h-[847.73px] relative object-cover" src="https://placehold.co/392x848" alt="Fondo" />
              <div data-layer="Container" className="Container w-96 h-[847.73px] left-0 top-0 absolute bg-gradient-to-b from-black/90 via-black/70 to-black/95" />
            </div>

            {/* Contenido Principal */}
            <div data-layer="Container" className="Container w-96 h-[847.73px] px-6 pt-12 pb-10 left-0 top-0 absolute inline-flex flex-col justify-start items-start">
              
              {/* Botón Volver */}
              <button 
                type="button"
                onClick={onVolver}
                data-layer="Button" 
                className="Button w-80 h-9 pb-4 inline-flex justify-start items-center gap-1 group cursor-pointer"
              >
                <div data-svg-wrapper data-layer="Icon" className="Icon relative">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors"/>
                  </svg>
                </div>
                <div data-layer="Volver" className="Volver text-center justify-start text-white/40 group-hover:text-white text-xs font-medium font-['Inter'] leading-5 transition-colors">Volver</div>
              </button>

              {/* Encabezado */}
              <div data-layer="Container" className="Container w-80 pb-7 flex flex-col justify-start items-start">
                <div data-layer="Container" className="Container self-stretch h-3.5 flex flex-col justify-start items-start">
                  <div data-layer="Recuperación" className="RecuperaciN justify-start text-yellow-400 text-[10px] font-black font-['Inter'] uppercase leading-4 tracking-[4px]">Recuperación</div>
                </div>
                <div data-layer="Container" className="Container w-80 h-10 pt-1 flex flex-col justify-start items-start">
                  <div data-layer="OLVIDÉ MI CONTRASEÑA" className="OlvidMiContraseA justify-start">
                    <span className="text-white text-4xl font-black font-['Barlow_Condensed'] leading-9">OLVIDÉ MI </span>
                    <span className="text-yellow-400 text-4xl font-black font-['Barlow_Condensed'] leading-9">CONTRASEÑA</span>
                  </div>
                </div>
                <div data-layer="Container" className="Container w-80 h-7 pt-2 flex flex-col justify-start items-start">
                  <div data-layer="Ingresá tu email y te enviaremos un enlace." className="IngresTuEmailYTeEnviaremosUnEnlace justify-start text-white/40 text-xs font-normal font-['Inter'] leading-5">Ingresá tu email y te enviaremos un enlace.</div>
                </div>
              </div>

              {/* Card de Confirmación */}
              <div data-layer="Container" className="Container w-80 h-64 p-6 bg-white/10 rounded-2xl outline outline-1 outline-offset-[-1.13px] outline-white/10 flex flex-col justify-start items-start">
                <div data-layer="Container" className="Container self-stretch h-16 flex flex-col justify-start items-center">
                  <div data-layer="✉️" className="text-center justify-start text-gray-100 text-5xl font-normal font-['Inter'] leading-[72px]">✉️</div>
                </div>
                <div data-layer="Container" className="Container w-72 h-10 pt-3.5 flex flex-col justify-start items-center">
                  <div data-layer="¡Enlace enviado!" className="EnlaceEnviado text-center justify-start text-white text-lg font-bold font-['Inter'] leading-7">¡Enlace enviado!</div>
                </div>
                <div data-layer="Container" className="Container w-72 h-12 pt-2.5 pb-5 flex flex-col justify-start items-center">
                  <div data-layer="Revisá tu bandeja en usuario@email" className="RevisTuBandejaEnUsuarioEmail text-center justify-start">
                    <span className="text-white/40 text-xs font-normal font-['Inter'] leading-5">Revisá tu bandeja en </span>
                    <span className="text-yellow-400 text-xs font-bold font-['Inter'] leading-5">{email}</span>
                  </div>
                </div>
                <div data-layer="Container" className="Container self-stretch h-10 relative">
                  <button
                    type="button"
                    onClick={onVolverLogin}
                    data-layer="Button" 
                    className="Button w-36 h-10 left-[71.98px] top-0 absolute bg-yellow-400 hover:bg-yellow-300 transition-colors rounded-[10px] cursor-pointer"
                  >
                    <div data-layer="VOLVER AL LOGIN" className="VolverAlLogin left-[28px] top-[11.38px] absolute text-center justify-start text-black text-xs font-extrabold font-['Barlow_Condensed'] leading-5 tracking-wide uppercase">VOLVER AL LOGIN</div>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}