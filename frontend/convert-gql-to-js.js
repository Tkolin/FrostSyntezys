const fs = require("fs");
const path = require("path");

// Директории для запросов и мутаций
const gqlDirectoryQueries = "./src/gql/queries";
const gqlDirectoryMutations = "./src/gql/mutations";

// Функция для обработки файлов в директории
function processGqlFiles(directory) {
  fs.readdirSync(directory).forEach((file) => {
    if (file.endsWith(".gql")) {
      const gqlContent = fs.readFileSync(path.join(directory, file), "utf8");
      const jsContent = `import gql from 'graphql-tag';\n\nexport default gql\`${gqlContent}\`;`;
      fs.writeFileSync(
        path.join(directory, file.replace(".gql", ".js")),
        jsContent,
        "utf8"
      );
      console.log(`Converted ${file} to JavaScript.`);
    }
  });
}

// Обработка запросов и мутаций
processGqlFiles(gqlDirectoryQueries);
processGqlFiles(gqlDirectoryMutations);
