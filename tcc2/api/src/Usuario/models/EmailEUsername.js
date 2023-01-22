/**
 * Criamos uma collection para salvar um hash do email e username
 */
const { default: mongoose } = require("mongoose");

const EmailEUsernameSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
});

module.exports = mongoose.model('EmailEUsername', EmailEUsernameSchema);
