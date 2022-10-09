import { controlador } from './controle/controle.js';

const botaoDePesquisa = document.querySelector('[data-pesquisa="botao"]')
const mostraVideos = () => (controlador.mostraVideos());

window.addEventListener('load', () => mostraVideos());

botaoDePesquisa.addEventListener('click', (e) => controlador.buscarVideo(e));