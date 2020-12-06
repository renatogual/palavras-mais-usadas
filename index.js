const fn = require('./funcoes')

const simbolos = [
    '.', '?', '!', '-', ',', '"', '♪', '_', '\r', '(', ')', '[', ']', '<i>', '</i>'
]

fn.lerDiretorio('./legendas')
    .then(arquivos => fn.filtroExtensoes(arquivos, '.srt'))
    .then(arquivoSRT => fn.lerArquivos(arquivoSRT))
    .then(conteudos => fn.mesclarElementos(conteudos))
    .then(conteudos => fn.separarTextoPor(conteudos, '\n'))
    .then(linhas => fn.limparLinhasVazias(linhas))
    .then(linhas => fn.limparLinhasComPadrao(linhas, '-->'))
    .then(linhas => fn.limparLinhasApenasNumeros(linhas))
    .then(linhas => fn.limparSimbolos(linhas, simbolos))
    .then(conteudos => fn.mesclarElementos(conteudos))
    .then(conteudos => fn.separarTextoPor(conteudos, ' '))
    .then(linhas => fn.limparLinhasVazias(linhas))
    .then(linhas => fn.limparLinhasApenasNumeros(linhas))
    .then(palavras => fn.agruparPalavras(palavras))
    .then(palavras => fn.ordenarPalavrasPorAttr(palavras, 'qtde', 'desc'))
    .then(palavras => fn.transformarParaTexto(palavras))
    .then(resultado => fn.salvarResultado(__dirname + '/palavras_mais_usadas.txt', resultado))