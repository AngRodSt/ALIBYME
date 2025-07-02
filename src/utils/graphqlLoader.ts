// Loader personalizado para archivos GraphQL que funciona tanto con Webpack como con Turbopack
import { readFileSync } from "fs";
import { resolve } from "path";

export function loadGraphQL(filePath: string): string {
  try {
    const fullPath = resolve(filePath);
    return readFileSync(fullPath, "utf-8");
  } catch (error) {
    console.error(`Error loading GraphQL file: ${filePath}`, error);
    return "";
  }
}
