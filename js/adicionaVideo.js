import { controlador } from "./controle/controle.js";

const formulario = document.querySelector('[data-submit="formulario"]')

formulario.addEventListener('submit', (e) => {
    controlador.adicionaVideo(e);
})
