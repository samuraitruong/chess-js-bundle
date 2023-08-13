const path = require("path");

module.exports = {
  entry: "./app.js", // Entry point of your application
  output: {
    filename: `chess.${process.env.CHESS_JS_VERSION || "latest"}.js`, // Output bundle filename with version or "latest"
    path: path.resolve(__dirname, "dist"), // Output directory
  },
};
