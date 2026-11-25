import { useState } from "react";
import "./TablaGestioUsuario.css";

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