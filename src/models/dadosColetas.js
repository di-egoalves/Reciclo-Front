class DadosColeta {
    constructor(catador, resumoColetas, dataInicio, dataFim, coletas) {
      this.catador = catador;
      this.coletas = coletas;
      this.resumoColetas = resumoColetas;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
    }
  }
  
  DadosColeta.prototype.dataInicio = null;
  DadosColeta.prototype.dataFim = null;
  DadosColeta.prototype.catador = null;
  DadosColeta.prototype.coletas = null;
  DadosColeta.prototype.resumoColetas = null;
  