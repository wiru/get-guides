module.exports = server = (() => {
  if (
    window.location.origin === "http://localhost:8080" ||
    window.location.origin === "http://localhost:5000"
  ) {
    return "http://localhost:5000";
  } else {
    return "https://getguides.herokuapp.com";
  }
})();
