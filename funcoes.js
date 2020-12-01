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

function limparLinhasVazias(array) {
    return array.filter(el => el.trim())
}

function limparLinhasComPadrao(array, padrao) {
    return array.filter(el => !el.includes(padrao))
}

function limparLinhasApenasNumeros(array) {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num // Irá retornar apenas o que não for números, pois NaN !== NaN retorna true
    })
}

function limparSimbolos(array, simbolos) {
    return array.map(el => {
        let textoSemSimbolos = el
        simbolos.forEach(simbolo => {
            textoSemSimbolos = textoSemSimbolos.split(simbolo).join('')
        });
        return textoSemSimbolos
    })
}

function mesclarElementos(array) {
    return array.join(' ')
} 

function separarTextoPor(texto, simbolo) {
    return texto.split(simbolo)
}

module.exports = {
    lerDiretorio,
    filtroExtensoes,
    lerArquivo,
    lerArquivos,
    limparLinhasVazias,
    limparLinhasComPadrao,
    limparLinhasApenasNumeros,
    limparSimbolos,
    mesclarElementos,
    separarTextoPor
}