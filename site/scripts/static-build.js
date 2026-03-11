/**
 * Static export build script.
 *
 * Temporarily hides dynamic metadata route handlers (icon, apple-icon,
 * opengraph-image, manifest) that are incompatible with output: 'export',
 * runs `next build`, then restores them.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "..", "src", "app");

// Files that use force-dynamic, ImageResponse, or reference dynamic icon routes
const filesToHide = [
  "icon.tsx",
  "apple-icon.tsx",
  "opengraph-image.tsx",
  "manifest.ts",
];

// Temporarily rename files so Next.js ignores them
filesToHide.forEach((f) => {
  const src = path.join(appDir, f);
  if (fs.existsSync(src)) {
    fs.renameSync(src, src + ".bak");
  }
});

try {
  execSync("npx next build", { stdio: "inherit", env: process.env });
} finally {
  // Always restore, even on build failure
  filesToHide.forEach((f) => {
    const bak = path.join(appDir, f + ".bak");
    if (fs.existsSync(bak)) {
      fs.renameSync(bak, path.join(appDir, f));
    }
  });
}
