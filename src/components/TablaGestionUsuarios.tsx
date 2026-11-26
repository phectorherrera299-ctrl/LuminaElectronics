import { useMemo, useState } from "react";
import { useState } from "react";
import "./TablaGestioUsuario.css";

type RolCuenta = "Administrador" | "Cliente";
interface UsuarioRegistrado { id: string; nombre: string; email: string; rol: RolCuenta; fechaRegistro: string; estado: "Activo" | "Inactivo"; avatar: string; }

const USUARIOS_INICIALES: UsuarioRegistrado[] = [
  { id: "USR-0012", nombre: "Sofía Valenzuela", email: "sofia.admin@lumina.dev", rol: "Administrador", fechaRegistro: "12 Ene 2024", estado: "Activo", avatar: "SV" },
  { id: "USR-B489", nombre: "Mateo Rivas", email: "m.rivas@designcraft.co", rol: "Cliente", fechaRegistro: "28 Feb 2024", estado: "Activo", avatar: "MR" },
  { id: "USR-0512", nombre: "Camila Torres", email: "camila@techflows.io", rol: "Cliente", fechaRegistro: "04 Mar 2024", estado: "Activo", avatar: "CT" },
  { id: "USR-0201", nombre: "Julián Morales", email: "jmorales@inbox.me", rol: "Cliente", fechaRegistro: "18 Nov 2023", estado: "Inactivo", avatar: "JM" },
  { id: "USR-0715", nombre: "Lucía Fernández", email: "lucia.fernandez@mail.com", rol: "Cliente", fechaRegistro: "09 Abr 2024", estado: "Activo", avatar: "LF" },
];

export const TablaGestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const usuariosFiltrados = useMemo(() => usuarios.filter((usuario) => `${usuario.nombre} ${usuario.email}`.toLowerCase().includes(busqueda.toLowerCase().trim())), [usuarios, busqueda]);

  const eliminarUsuario = (usuario: UsuarioRegistrado) => {
    const confirmar = window.confirm(`¿Seguro que querés eliminar a ${usuario.nombre}? Esta acción no se puede deshacer.`);
    if (confirmar) setUsuarios((actuales) => actuales.filter((item) => item.id !== usuario.id));
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-secondary-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-heading text-lg font-extrabold text-secondary-900">Gestión de Clientes &amp; Roles</h2><span className="rounded-full bg-primary-50 px-2.5 py-1 text-[10px] font-bold text-primary-700">{usuarios.length.toLocaleString("es-AR")} registrados</span></div><p className="mt-1 text-xs text-secondary-500">Control de cuentas activas, privilegios administrativos y estados de acceso.</p></div><label className="relative block w-full sm:max-w-xs"><span className="sr-only">Filtrar por nombre o email</span><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">⌕</span><input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Filtrar por nombre o email..." className="w-full rounded-xl border border-secondary-200 bg-secondary-50 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100" /></label></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[780px] border-collapse text-left"><thead className="bg-primary-50/80 text-[10px] font-extrabold uppercase tracking-wider text-secondary-600"><tr><th className="px-5 py-4">Usuario</th><th className="px-4 py-4">Email</th><th className="px-4 py-4">Rol asignado</th><th className="px-4 py-4">Fecha de registro</th><th className="px-4 py-4">Estado</th><th className="px-4 py-4 text-right">Acciones</th></tr></thead><tbody className="divide-y divide-secondary-100">{usuariosFiltrados.map((usuario, index) => <tr key={usuario.id} className="transition hover:bg-primary-50/40"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${index % 2 === 0 ? "bg-primary-100 text-primary-700" : "bg-secondary-100 text-secondary-600"}`}>{usuario.avatar}</div><div><p className="text-xs font-bold text-secondary-900">{usuario.nombre}</p><p className="mt-0.5 text-[10px] text-secondary-400">ID #{usuario.id}</p></div></div></td><td className="px-4 py-4 text-xs text-secondary-600">{usuario.email}</td><td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${usuario.rol === "Administrador" ? "bg-primary-100 text-primary-700" : "bg-secondary-100 text-secondary-700"}`}>{usuario.rol}</span></td><td className="px-4 py-4 text-xs text-secondary-600">{usuario.fechaRegistro}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${usuario.estado === "Activo" ? "bg-tertiary-100 text-tertiary-700" : "bg-secondary-100 text-secondary-500"}`}><span className={`h-1.5 w-1.5 rounded-full ${usuario.estado === "Activo" ? "bg-tertiary-500" : "bg-secondary-400"}`}/>{usuario.estado}</span></td><td className="px-4 py-4 text-right"><button type="button" onClick={() => eliminarUsuario(usuario)} className="rounded-lg border border-error/20 px-3 py-2 text-[10px] font-bold text-error transition hover:bg-error/5">Eliminar</button></td></tr>)}</tbody></table>{usuariosFiltrados.length === 0 && <div className="px-5 py-12 text-center"><p className="text-sm font-semibold text-secondary-700">No encontramos usuarios</p><p className="mt-1 text-xs text-secondary-500">Probá con otro nombre o correo electrónico.</p></div>}</div>
      <div className="flex flex-col gap-1 border-t border-secondary-100 px-5 py-3 text-[10px] text-secondary-400 sm:flex-row sm:items-center sm:justify-between"><span>Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios</span><span>Los datos de esta versión son de demostración local.</span></div>
    </section>
  );
};

type Usuario = {
  id: number;
  nombre: string;
  email: string;
  rol: "Administrador" | "Cliente";
  fecha: string;
  activo: boolean;
};

const usuariosIniciales: Usuario[] = [
  {
    id: 8012,
    nombre: "Sofía Valenzuela",
    email: "sofia.admin@lumina.dev",
    rol: "Administrador",
    fecha: "12 Ene 2024",
    activo: true,
  },
  {
    id: 8489,
    nombre: "Mateo Rivas",
    email: "m.rivas@designcraft.co",
    rol: "Cliente",
    fecha: "28 Feb 2024",
    activo: true,
  },
  {
    id: 8512,
    nombre: "Camila Torres",
    email: "camila@techflows.io",
    rol: "Cliente",
    fecha: "04 Mar 2024",
    activo: true,
  },
  {
    id: 8201,
    nombre: "Julián Morales",
    email: "jmorales@inbox.me",
    rol: "Cliente",
    fecha: "18 Nov 2023",
    activo: false,
  },
];

export function TablaGestionUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.nombre} ${usuario.email}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const cambiarEstado = (id: number) => {
    setUsuarios((actuales) =>
      actuales.map((usuario) =>
        usuario.id === id
          ? { ...usuario, activo: !usuario.activo }
          : usuario
      )
    );
  };

  const eliminarUsuario = (id: number) => {
    setUsuarios((actuales) =>
      actuales.filter((usuario) => usuario.id !== id)
    );
  };

  return (
    <section className="gestion-usuarios">
      <div className="gestion-header">
        <div>
          <h2>Gestión de Clientes & Roles</h2>
          <span>{usuarios.length} registrados</span>
          <p>Control de cuentas activas, privilegios administrativos y estados de acceso.</p>
        </div>

        <input
          type="search"
          placeholder="Filtrar por nombre o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="tabla-responsive">
        <table>
          <thead>
            <tr>
              <th>USUARIO</th>
              <th>EMAIL</th>
              <th>ROL ASIGNADO</th>
              <th>FECHA DE REGISTRO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <strong>{usuario.nombre}</strong>
                  <small>ID #USR-{usuario.id}</small>
                </td>

                <td>{usuario.email}</td>

                <td>
                  <span className={`rol ${usuario.rol === "Administrador" ? "admin" : "cliente"}`}>
                    {usuario.rol}
                  </span>
                </td>

                <td>{usuario.fecha}</td>

                <td>
                  <span className={`estado ${usuario.activo ? "activo" : "inactivo"}`}>
                    {usuario.activo ? "● Activo" : "● Inactivo"}
                  </span>
                </td>

                <td className="acciones">
                  <button onClick={() => cambiarEstado(usuario.id)}>
                    {usuario.activo ? "Desactivar" : "Reactivar"}
                  </button>

                  <button
                    className="eliminar"
                    onClick={() => eliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan={6}>No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
