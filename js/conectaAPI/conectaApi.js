async function listaVideos() {
    return await (await fetch('http://localhost:3000/videos')).json();
}

async function publicaVideo(titulo, url, imagem, descricao) {
    const conexao = await fetch('http://localhost:3000/vides', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset="utf-8"'
        },
        body: JSON.stringify({
            titulo: titulo,
            url: url,
            imagem: imagem,
            descricao: `${descricao} mil visualizações`
        })
    })
    
    if (!conexao.ok) {
        throw new Error(`Não foi possível enviar o vídeo, houve erro de conexão ${conexao.status}`)
    }
    const converteConexao = await conexao.json();
    return converteConexao;
}

async function buscaVideo (termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/videos?q=${termoDeBusca}`);
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

export const conexao = {
    listaVideos,
    publicaVideo,
    buscaVideo
}
