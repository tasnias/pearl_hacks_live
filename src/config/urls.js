let domain = window.location.host;
let baseurl =
  domain.indexOf("localhost") != -1
    ? `http://${domain}/#`
    : `https://${domain}/#`;

export default baseurl;
