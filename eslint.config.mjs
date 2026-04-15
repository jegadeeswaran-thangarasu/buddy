import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Seeding random state in useEffect is intentional — avoids SSR/client
      // hydration mismatches. The rule's concern (cascading renders) doesn't
      // apply to one-shot mount effects with no dependencies.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
