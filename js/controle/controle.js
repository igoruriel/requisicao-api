import { conexao } from "../conectaAPI/conectaApi.js";

class ControleDOM {
    #lista = document.querySelector('[data-videos="lista"]')
    #inputs = document.querySelectorAll('[data-envio]');

    constroiCard(listaItens) {
        const template = listaItens.map(item => {
            return `<li class="videos__item">
            <iframe width="100%" height="72%" src="${item.url}"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            <div class="descricao-video">
                <img src="${item.imagem}" alt="logo canal alura">
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
            </div>
        </li>`
        }).join('');
        this.#lista.innerHTML = template;
    }

    async mostraVideos() {
        try {
            const listaVideos = await conexao.listaVideos();
            this.constroiCard(listaVideos);
        } catch (error) {
            this.#lista.innerHTML = `<h2 class="mensagem__titulo"> Não foi possível carregar os vídeos</h2>`
        }
    }

    async adicionaVideo(e) {
        e.preventDefault()
        const lista = [];
        this.#inputs.forEach((input) => {
            lista.push(input.value);
        })

        const [url, titulo, imagem, descricao = Math.floor(Math.random() * 10)] = lista;
        try {
            await conexao.publicaVideo(titulo, url, imagem, descricao);
            window.location.href = "../../../pages/envio-concluido.html"
        } catch (error) {
            alert(error)
        }
    }

    async buscarVideo(e) {
        e.preventDefault();
        const dadosDaPesquisa = document.querySelector('[data-pesquisa="input"]').value
        try {
            const busca = await conexao.buscaVideo(dadosDaPesquisa)
            this.constroiCard(busca);
            if (busca.length === 0) {
                this.#lista.innerHTML = `<h2 class="mensagem__titulo"> Não há videos</h2>`
            }
        } catch (error) {

        }
    }
}

export const controlador = new ControleDOM()