import { execSync } from "child_process";
import axios from "axios";
import fs from "fs";
import path from "path";
import { marked } from "marked";

async function fetchAllVersion() {
  const apiUrl = "https://api.github.com/repos/jhlywa/chess.js/tags";

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data.map((x) => x.name);
  } catch (error) {
    console.error("Error fetching latest version:", error);
    return null;
  }
}

async function buildAll() {
  const versionsToBuild = await fetchAllVersion();
  const distFolderPath = "./dist";
  const content = fs.readFileSync("readme.md", "utf8");
  // Create dist folder if it doesn't exist
  await fs.mkdirSync(distFolderPath, { recursive: true });

  const indexContent = [];

  for (const version of versionsToBuild) {
    try {
      console.log(`Building chess.js version ${version}`);
      execSync(`npm install chess.js@${version}`);
      execSync(`CHESS_JS_VERSION=${version} npm run build`);

      // Assuming the bundle file is named chess.js
      const bundleFileName = `chess.${version}.js`;
      const bundleFilePath = `https://samuraitruong.github.io/chess-js-bundle/${bundleFileName}`;

      indexContent.push(`- [${version}](${bundleFilePath})`);
    } catch (err) {
      console.error(err);
    }
  }

  // Generate index.md content
  const indexMdContent = indexContent.join("\n");
  const indexPath = path.join(distFolderPath, "index.html");

  // Write the index.md file
  await fs.writeFileSync(
    indexPath,
    marked(content.replace("__PLACEHOLDER__", indexMdContent))
  );
  execSync(`npm install chess.js`);
  console.log("index.md generated successfully");
}

(async () => {
  await buildAll();
})();
