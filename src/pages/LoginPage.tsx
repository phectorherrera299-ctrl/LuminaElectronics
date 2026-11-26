import { useState, type FormEvent } from "react";
import { useAutenticacion } from "../context/ContextoAutenticacion";

interface LoginPageProps { alNavegar: (seccion: string) => void; }

export const LoginPage = ({ alNavegar }: LoginPageProps) => {
  const { iniciarSesion } = useAutenticacion();
  const [email, setEmail] = useState("usuario@lumina.dev");
  const [password, setPassword] = useState("Lumina2026!");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordar, setRecordar] = useState(true);
  const [rol, setRol] = useState<"Cliente" | "Admin">("Cliente");
  const [mensaje, setMensaje] = useState("");

  const seleccionarRol = (nuevoRol: "Cliente" | "Admin") => {
    setRol(nuevoRol);
    setEmail(nuevoRol === "Admin" ? "admin@lumina.dev" : "usuario@lumina.dev");
    setPassword(nuevoRol === "Admin" ? "Admin2026!" : "Lumina2026!");
    setMensaje("");
  };

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (!email.trim() || !password.trim()) { setMensaje("Completá tu correo y contraseña para continuar."); return; }
    iniciarSesion(email.trim(), rol, recordar);
    setMensaje("¡Bienvenido! Iniciaste sesión en el entorno de demostración.");
    window.setTimeout(() => alNavegar("catalogo"), 650);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#f5f7ff] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-primary-100 bg-white shadow-xl shadow-primary-900/10 lg:grid-cols-[1.15fr_.85fr]">
        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-primary-600"><span className="h-2 w-2 rounded-full bg-primary-500"/> Portal de acceso · Lumina Commerce</div>
          <div className="mb-7"><p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-primary-500">Identificación segura</p><h1 className="font-heading text-3xl font-extrabold tracking-tight text-secondary-900 sm:text-4xl">Bienvenido de nuevo</h1><p className="mt-3 max-w-lg text-sm leading-6 text-secondary-500">Gestioná tus pedidos, monitoreá entregas express o administrá el ecosistema global.</p></div>
          <form onSubmit={enviar} className="space-y-5">
            <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4"><div className="mb-3 flex items-center justify-between gap-2"><span className="text-xs font-bold text-secondary-800">Simulador de Roles Demo</span><span className="text-[10px] text-secondary-500">Clic para auto-completar</span></div><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => seleccionarRol("Cliente")} className={`rounded-xl px-3 py-3 text-xs font-bold transition ${rol === "Cliente" ? "bg-white text-primary-700 shadow-sm ring-1 ring-primary-200" : "text-secondary-500 hover:bg-white"}`}>♙ Cliente / Comprador</button><button type="button" onClick={() => seleccionarRol("Admin")} className={`rounded-xl px-3 py-3 text-xs font-bold transition ${rol === "Admin" ? "bg-white text-primary-700 shadow-sm ring-1 ring-primary-200" : "text-secondary-500 hover:bg-white"}`}>♧ Administrador</button></div></div>
            <label className="block text-xs font-bold text-secondary-800">Correo Electrónico<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@lumina.dev" className="mt-2 w-full rounded-xl border border-secondary-200 bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100" /></label>
            <label className="block text-xs font-bold text-secondary-800">Contraseña<div className="mt-2 flex rounded-xl border border-secondary-200 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100"><input type={mostrarPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="min-w-0 flex-1 rounded-l-xl px-4 py-3 text-sm font-normal outline-none" placeholder="Ingresá tu contraseña"/><button type="button" onClick={() => setMostrarPassword(!mostrarPassword)} className="px-4 text-xs font-semibold text-primary-600">{mostrarPassword ? "Ocultar" : "Mostrar"}</button></div></label>
            <div className="flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 text-xs text-secondary-600"><input type="checkbox" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} className="accent-primary-600"/> Recordar mi sesión en este equipo</label><span className="text-[10px] font-semibold text-tertiary-700">● Servidores activos (demo)</span></div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-700">Ingresar al Ecosistema <span>→</span></button>
            {mensaje && <p role="status" className="rounded-xl bg-tertiary-50 px-4 py-3 text-xs font-semibold text-tertiary-700">{mensaje}</p>}
          </form>
          <div className="my-5 flex items-center gap-3 text-[10px] text-secondary-400"><span className="h-px flex-1 bg-secondary-100"/>O ingresá de forma rápida con<span className="h-px flex-1 bg-secondary-100"/></div>
          <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => seleccionarRol("Cliente")} className="rounded-xl border border-secondary-200 px-3 py-3 text-xs font-semibold text-secondary-600 hover:bg-secondary-50">Google Account</button><button type="button" onClick={() => seleccionarRol("Admin")} className="rounded-xl border border-secondary-200 px-3 py-3 text-xs font-semibold text-secondary-600 hover:bg-secondary-50">GitHub SSO</button></div>
          <p className="mt-6 text-center text-xs text-secondary-500">¿Aún no tienes una cuenta? <button type="button" onClick={() => setMensaje("El registro de cuentas se encuentra fuera del alcance de esta demostración.")} className="font-bold text-primary-600 hover:underline">Crear una cuenta gratis</button></p>
          <p className="mt-5 text-center text-[10px] text-secondary-400">Demo: Cliente usuario@lumina.dev · Administrador admin@lumina.dev</p>
        </section>
        <aside className="relative overflow-hidden bg-gradient-to-br from-[#e8eaff] via-[#e7edff] to-[#dce8ff] p-7 sm:p-10 lg:p-12"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-2xl"/><div className="relative"><div className="mb-12 flex items-center justify-between"><span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-700">Lumina One</span><span className="text-xs font-bold text-primary-700">Tier VIP · Prime</span></div><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-primary-600">Ventajas Lumina One</p><h2 className="font-heading text-2xl font-extrabold leading-tight text-secondary-900">Una sola cuenta para dominar tu setup digital.</h2><p className="mt-3 text-sm leading-6 text-secondary-600">Centralizá tus componentes, garantías de fábrica oficiales y prioridad logística en cada despacho nacional.</p><div className="mt-8 space-y-3">{[{icon:"◉",title:"Tracking Telemetría en Vivo",body:"Monitoreá tus envíos y recibí confirmación de despacho prioritario express."},{icon:"✓",title:"Lista de Deseos Multi-Dispositivo",body:"Tus builds, componentes y accesorios sincronizados instantáneamente en el mismo perfil."},{icon:"✦",title:"Ofertas Privadas & Descuentos Tech",body:"Descuentos exclusivos por volumen de compra y acceso anticipado a drops."}].map((item) => <div key={item.title} className="flex gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-100 font-bold text-primary-700">{item.icon}</span><div><h3 className="text-xs font-bold text-secondary-900">{item.title}</h3><p className="mt-1 text-[11px] leading-5 text-secondary-500">{item.body}</p></div></div>)}</div><div className="mt-5 rounded-2xl border border-white/70 bg-white/70 p-4"><p className="text-[10px] font-extrabold uppercase tracking-wider text-primary-600">Hardware passport</p><p className="mt-1 text-sm font-bold text-secondary-900">Garantía Lumina Care Plus</p><p className="text-[11px] text-secondary-500">Protección extendida y soporte técnico.</p></div><div className="mt-8 flex items-center gap-2 text-[10px] font-semibold text-tertiary-700">◈ Protección criptográfica TLS 1.3 · Demo visual</div></div></aside>
      </div>
    </main>
  );
};
