import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  // but exclude static file extensions to prevent MIME type errors
  app.use("*", (req, res) => {
    const url = req.originalUrl;
    
    // Remove query string and hash to check the actual path
    const pathWithoutQuery = url.split('?')[0].split('#')[0];
    
    // List of static file extensions that should not be served as HTML
    const staticExtensions = [
      '.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx',
      '.css', '.scss', '.sass', '.less',
      '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
      '.woff', '.woff2', '.ttf', '.eot', '.otf',
      '.json', '.xml', '.txt', '.pdf',
      '.mp4', '.webm', '.mp3', '.wav',
      '.zip', '.tar', '.gz'
    ];
    
    // Check if the URL path ends with a static file extension
    const hasStaticExtension = staticExtensions.some(ext => 
      pathWithoutQuery.toLowerCase().endsWith(ext.toLowerCase())
    );
    
    // If it's a static file request, return 404 instead of serving HTML
    if (hasStaticExtension) {
      res.status(404).send('File not found');
      return;
    }
    
    // Otherwise, serve index.html for SPA routing
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}