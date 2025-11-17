function getSmsGateway(phone, carrier) {
  const map = {
    bell: "txt.bell.ca",
    rogers: "pcs.rogers.com",
    telus: "msg.telus.com",
    fido: "fido.ca",
    videotron: "videotron.ca",
    koodo: "msg.koodomobile.com"
  };

  if (!map[carrier]) return null;

  return `${phone}@${map[carrier]}`;
}

module.exports = getSmsGateway;
