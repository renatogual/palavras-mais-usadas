const fn = require('./funcoes')


fn.lerDiretorio('./legendas')
    .then(arquivos => fn.filtroExtensoes(arquivos, '.srt'))
    .then(arquivoSRT => fn.lerArquivos(arquivoSRT))
    .then(console.log)