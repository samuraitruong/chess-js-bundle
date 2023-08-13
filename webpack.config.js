const path = require("path");

module.exports = {
  entry: "./app.js", // Entry point of your application
  output: {
    filename: "chess.js", // Output bundle filename
    path: path.resolve(__dirname, "dist"), // Output directory
  },
};
