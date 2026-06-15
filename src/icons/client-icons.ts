// Slim icon collections for client-side Svelte components.
// Only includes icons actually used, instead of the full ~7MB icon sets.
import { addCollection } from "@iconify/svelte";
import materialSymbols from "./material-symbols-slim.json";
import fa6Solid from "./fa6-solid-slim.json";

addCollection(materialSymbols);
addCollection(fa6Solid);

export { materialSymbols, fa6Solid };
