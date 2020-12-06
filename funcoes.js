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

function agruparPalavras(palavras) {
    return Object.values(palavras.reduce((agrupadas, palavra) => {
        let p = palavra.toLowerCase()
        let qtde = agrupadas[p] ? agrupadas[p].qtde + 1 : 1
        agrupadas[p] = { palavra: p, qtde: qtde }
        return agrupadas
    }, {}))
}

function ordenarPalavrasPorAttr(array, attr, ordem='asc') {
    const asc = (el1, el2) => el1[attr] - el2[attr]
    const desc = (el1, el2) => el2[attr] - el1[attr]
    return array.sort(ordem === 'asc' ? asc : desc)
}

function transformarParaTexto(array) {
    let texto = ''
    array.map(linha => {
        texto += `${linha.palavra} = ${linha.qtde} \n`
    })
    return texto
}

function salvarResultado(caminho, data) {
    fs.writeFile(caminho, data, {encoding: 'utf-8', flag: 'w'}, (err) => {
        if(err) return console.log(err);
        return console.log('Resultado gerado com sucesso !!!');
    })
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
    separarTextoPor,
    agruparPalavras,
    ordenarPalavrasPorAttr,
    transformarParaTexto,
    salvarResultado
}