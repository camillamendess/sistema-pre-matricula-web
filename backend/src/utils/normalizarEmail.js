function normalizarEmail(email) {
    return typeof email === 'string' ? email.trim().toLowerCase() : email;
}

module.exports = normalizarEmail;
