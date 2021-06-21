import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraEventos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoEvento =
  getFirestore().
    collection("Evento");
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
    const codigoid = getString(
        formData, "codigoid").trim();  
    const nombre = getString(formData, "nombre").trim();
    const telefono  = getString(formData, "telefono").trim();
    const tipo = getString(formData, "tipo").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Articulo} */
    const modelo = {
      codigoid,
      nombre,
      telefono ,
      tipo,
      fecha 
    };
    await daoEvento .
      add(modelo);
      muestraEventos ();
  } catch (e) {
    muestraError(e);
  }
}
