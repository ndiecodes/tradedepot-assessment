class Exception extends Error {
  constructor(message, code) {
    super(message);
    this.name = "Exception";
    this.code = code || 500;
  }
}

module.exports = Exception;
