import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoEvento =
  getFirestore().
    collection("Evento");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
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
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoEvento .
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  daEvento } */
      const data = doc.data();
      forma.codigoid.value = data.codigoid;
      forma.nombre.value = data.nombre || "";
      forma.telefono .value = data.telefono  || "";
      forma.tipo.value = data.tipo || "";
      forma.fecha.value = data.fecha || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontrĂ³.");
    }
  } catch (e) {
    muestraError(e);
    muestraEventos ();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const codigoid = getString(
        formData, "codigo").trim();  
    const nombre = getString(formData, "nombre").trim();
    const telefono  = getString(formData, "talla ").trim();
    const tipo = getString(formData, "precio").trim();
    const fecha = getString(formData, "imagen").trim();
    /**
     * @type {
        import("./tipos.js").
                Evento } */
    const modelo = {
      codigoid, 
      nombre,
      telefono ,
      tipo,
      fecha
    };
    await daoEvento.
      doc(id).
      set(modelo);
      muestraEventos ();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminaciĂ³n")) {
      await daoEvento.
        doc(id).
        delete();
        muestraEventos ();
    }
  } catch (e) {
    muestraError(e);
  }
}
