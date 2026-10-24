import { defineConfig } from "vite";
import { existsSync, readdirSync } from "node:fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { makoData } from "@makoai/app-sdk/vite";

const bindingsDir = new URL("./bindings", import.meta.url);

export default defineConfig({
  plugins: [react(), tailwindcss(), makoData()],
  // The binding names, for RefreshAllButton (@makoai/app-sdk/ui): a new
  // bindings/<name>.sql is picked up without touching the code.
  define: {
    __APP_BINDING_NAMES__: JSON.stringify(
      existsSync(bindingsDir)
        ? readdirSync(bindingsDir)
            .filter(name => name.endsWith(".sql"))
            .map(name => name.slice(0, -4))
        : [],
    ),
  },
  // Relative asset URLs so builds work under any hosting prefix
  // (including Mako's token-scoped preview paths).
  base: "./",
  server: {
    // The preview reaches the dev server on the sandbox's public origin
    // (<port>-<sandbox>.e2b.app). Without this, a `vite` started from the
    // terminal answers "Blocked request. This host is not allowed."
    host: true,
    allowedHosts: [".e2b.app"],
  },
});
