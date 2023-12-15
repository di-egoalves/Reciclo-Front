
class VendaMaterial {
    constructor(material) {
      this.id = material.id;
      this.nome = material.nome;
      this.quantidade = 0;
    }
  }

  class ResumoVenda {
    constructor(vendas, materiais) {
      this.quantidadeVendas = vendas.length;
  
      let materiaisMap = new Map();
      materiais.forEach(material => materiaisMap.set(material.id, new VendaMaterial(material)));
  
      vendas.forEach((venda) => {
        venda.materiais.forEach(material => {
          const vendaMaterial = materiaisMap.get(material.id);
          if (vendaMaterial) {
            vendaMaterial.quantidade += material.quantidade;
          }
        });
      });
  
      this.vendasPorMaterial = Array.from(materiaisMap.values());
    }
  }





  export default ResumoVenda;