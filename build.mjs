import { execSync } from "child_process";
import axios from "axios";

async function fetchAllVersion() {
  const apiUrl = "https://api.github.com/repos/jhlywa/chess.js/tags";

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    //const latestVersion = data[0].name; // Assuming the latest tag is the first in the array

    return data.map((x) => x.name);
  } catch (error) {
    console.error("Error fetching latest version:", error);
    return null;
  }
}

async function buildAll() {
  const versionsToBuild = await fetchAllVersion();
  //["v1.0.0-beta.6", "v1.0.0-beta.5"]; // Add other versions as needed

  for (const version of versionsToBuild) {
    console.log(`Building chess.js version ${version}`);
    execSync(`npm install chess.js@${version}`);
    execSync(`CHESS_JS_VERSION=${version} npm run build`);
  }
}

(async () => {
  await buildAll();
})();
