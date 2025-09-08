import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = `${__dirname}/../dist`;
if (!existsSync(dist)) mkdirSync(dist, { recursive: true });
copyFileSync(`${dist}/index.html`, `${dist}/404.html`);
console.log("Created dist/404.html for SPA routing.");
