const suma = 3 + 5;
console.warn("suma", suma);

const fs = require("fs");
fs.writeFileSync("test.html", `suma: ${suma}`);
