const S = require("string");

function tratarErrosEsperados(res, err) {
  // ENTRAR QUANDO O MOOGONSEE DER ALGUM ERRO
  if (String(err).includes(`ValidationError: `)) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: S(
        String(err).replace("ValidationError: ", "")
      ).replaceAll(":", "").s,
      resposta: String(err),
    });
  }
  // PODE SER UM ERRO DEFINIDO MANUALMENTE POR MIM
  if (String(err).includes(`Error: `)) {
    return res.status(400).json({
      status: "Erro",
      statusMensagem: String(err).replace("Error: ", ""),
      resposta: String(err),
    });
  }
  // ERRO INESPERADO
  console.error(err);
  return res.status(500).json({
    status: "Erro",
    statusMensagem: "Houve um problema inesperado, tente novamente mais tarde.",
    resposta: String(err),
  });
}

module.exports = tratarErrosEsperados;
