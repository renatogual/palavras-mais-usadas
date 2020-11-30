const fs = require('fs')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            let arquivos = fs.readdirSync(caminho);
            arquivos = arquivos.map(arquivo => `${caminho}/${arquivo}`);
            resolve(arquivos);
            
        } catch (error) {
            reject(error);
        }
    }) 
}

function filtroExtensoes(array, extensao) {
    return array.filter(item => item.endsWith(extensao))
}

function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho);
            resolve(conteudo.toString());
        } catch (error) {
            reject(error)
        }
    })
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

module.exports = {
    lerDiretorio,
    filtroExtensoes,
    lerArquivo,
    lerArquivos
}