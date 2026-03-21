import fs from "fs";
import path from "path";

const includeRegex = /<!--#\s*include\s+file="(.+?)"\s*.*?-->/g;

export default function ssiPlugin() {
  return {
    name: "vite-ssi",

    transformIndexHtml(html, ctx) {
      const root = process.cwd();

      const resolveInclude = (filePath, fromDir, stack = new Set()) => {
        const fullPath = path.resolve(fromDir, filePath);

        if (stack.has(fullPath)) return "";
        if (!fs.existsSync(fullPath)) return "";

        stack.add(fullPath);

        let content = fs.readFileSync(fullPath, "utf8");

        return content.replace(includeRegex, (match, includePath) => {
          return resolveInclude(
            includePath,
            path.dirname(fullPath),
            new Set(stack)
          );
        });
      };

      return html.replace(includeRegex, (match, includePath) => {
        return resolveInclude(includePath, root);
      });
    }
  };
}