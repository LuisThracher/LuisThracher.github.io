import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraProductos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoProducto =
  getFirestore().
    collection("Producto");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const identificador = getString(
        formData, "identificador").trim();  
    const nombre = getString(formData, "nombre").trim();
    const contacto = getString(formData, "contacto").trim();
    const tipo = getString(formData, "tipo").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      identificador,
      nombre,
      contacto,
      tipo,
      fecha 
    };
    await daoProducto.
      add(modelo);
      muestraProductos();
  } catch (e) {
    muestraError(e);
  }
}

