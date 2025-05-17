const { execSync } = require("child_process")

console.log("🚀 Setting up Git hooks...")

try {
  // Install Husky
  execSync("npx husky install", { stdio: "inherit" })

  // Add pre-commit hook
  execSync('npx husky add .husky/pre-commit "npx lint-staged"', { stdio: "inherit" })

  // Add pre-push hook
  execSync('npx husky add .husky/pre-push "npm run validate && npm run test"', { stdio: "inherit" })

  // Make hooks executable
  execSync("chmod +x .husky/pre-commit .husky/pre-push", { stdio: "inherit" })

  console.log("✅ Git hooks set up successfully!")
} catch (error) {
  console.error("❌ Error setting up Git hooks:", error)
  process.exit(1)
}
