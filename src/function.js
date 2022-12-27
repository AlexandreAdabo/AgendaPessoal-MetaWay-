export default {
  formataData(data) {
    let formatada = data.replace("-", "");
    var ano = formatada.substring(0, 4);
    var mes = formatada.substring(4, 6);
    var dia = formatada.substring(7, 9);
    return dia + "/" + mes + "/" + ano;
  },
};
