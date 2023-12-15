class ResumoColeta {
  constructor(coletas) {
    this.quantidadeColetas = coletas.length;
    this.quantidadeColetada = coletas.reduce((quantidade, coleta) => quantidade + coleta.quantidade, 0);
  }
}


export default ResumoColeta;