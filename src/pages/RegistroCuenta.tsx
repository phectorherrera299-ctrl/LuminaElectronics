
import { useState } from "react";

interface RegistroCuentaProps {
  onIrLogin?: () => void;
}

export default function RegistroCuenta({
  onIrLogin,
}: RegistroCuentaProps) {
  const [tipoCuenta, setTipoCuenta] = useState<"Personal" | "Corporativa">(
    "Personal"
  );
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const requisitos = [
    { texto: "Mínimo 8 caracteres", cumple: password.length >= 8 },
    { texto: "Una letra mayúscula", cumple: /[A-Z]/.test(password) },
    { texto: "Un número", cumple: /\d/.test(password) },
  ];

  const passwordValida = requisitos.every((r) => r.cumple);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");

    if (nombre.trim().length < 3) {
      setMensaje("Ingresá tu nombre completo.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMensaje("Ingresá un correo electrónico válido.");
      return;
    }

    if (!passwordValida) {
      setMensaje("La contraseña todavía no cumple los requisitos.");
      return;
    }

    if (password !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    if (!aceptaTerminos) {
      setMensaje("Tenés que aceptar los términos y condiciones.");
      return;
    }

    setMensaje(
      "¡Formulario validado correctamente! La conexión con el servicio de registro debe integrarse para crear la cuenta."
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 font-sans">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <section className="flex flex-col justify-center bg-slate-900 p-8 text-white md:p-12">
          <span className="mb-8 text-sm font-bold tracking-widest text-indigo-300">
            LUMINA ELECTRONICS
          </span>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-300">
            Beneficios de bienvenida
          </p>

          <h2 className="mb-5 text-3xl font-bold leading-tight">
            Acceso prioritario a hardware selecto
          </h2>

          <p className="mb-8 leading-relaxed text-slate-300">
            Registrate y recibí beneficios exclusivos, novedades y acceso a
            nuestro ecosistema tecnológico.
          </p>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
            <div className="mb-2 text-2xl">✦</div>
            <h3 className="mb-2 font-bold">Tu experiencia Lumina</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Descubrí productos, promociones y soluciones tecnológicas
              pensadas para vos.
            </p>
          </div>
        </section>

        <section className="p-7 md:p-10">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Alta de usuario
          </span>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Creá tu cuenta en Lumina
          </h1>

          <p className="mb-7 mt-2 text-sm text-slate-500">
            Unite a nuestra plataforma y accedé a beneficios exclusivos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tipo de cuenta
              </label>

              <div className="grid grid-cols-2 gap-3">
                {(["Personal", "Corporativa"] as const).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoCuenta(tipo)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      tipoCuenta === tipo
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600 hover:border-indigo-300"
                    }`}
                  >
                    {tipo === "Personal" ? "♙ " : "▣ "}
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nombre completo
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Martín Rodríguez"
                autoComplete="name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@ejemplo.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Creá una contraseña segura"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-20 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-600"
                >
                  {mostrarPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-xs font-semibold text-slate-600">
                  Requisitos de seguridad:
                </p>
                {requisitos.map((r) => (
                  <p
                    key={r.texto}
                    className={`text-xs ${r.cumple ? "text-emerald-600" : "text-slate-400"}`}
                  >
                    {r.cumple ? "✓" : "○"} {r.texto}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirmar contraseña
              </label>
              <input
                type={mostrarPassword ? "text" : "password"}
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                placeholder="Repetí tu contraseña"
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              {confirmarPassword && (
                <p
                  className={`mt-1 text-xs ${
                    password === confirmarPassword
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {password === confirmarPassword
                    ? "Las contraseñas coinciden"
                    : "Las contraseñas no coinciden"}
                </p>
              )}
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                className="mt-1 accent-indigo-600"
              />
              <span>
                Acepto los términos y condiciones y la política de privacidad.
              </span>
            </label>

            {mensaje && (
              <p
                role="status"
                className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700"
              >
                {mensaje}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white transition hover:bg-indigo-700"
            >
              Crear Cuenta
            </button>

            <p className="text-center text-sm text-slate-500">
              ¿Ya tenés una cuenta?{" "}
              <button
                type="button"
                onClick={onIrLogin}
                className="font-bold text-indigo-600 hover:underline"
              >
                Iniciá sesión
              </button>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
