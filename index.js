const fs = require("fs");
const path = require("path");
const { mineboty } = require("mineboty");

const projectRoot = __dirname;
const envPath = path.join(projectRoot, ".env");
const configPath = path.join(projectRoot, "config.json");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const envContent = fs.readFileSync(filePath, "utf8");

  for (const rawLine of envContent.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

loadEnvFile(envPath);

const config = {
  ip: requiredEnv("MINECRAFT_SERVER_IP"),
  port: requiredEnv("MINECRAFT_SERVER_PORT"),
  name: requiredEnv("MINECRAFT_BOT_NAME"),
  password: process.env.MINECRAFT_PASSWORD || "",
  auth: process.env.MINECRAFT_AUTH || "offline",
  "auto-night-skip": process.env.MINECRAFT_AUTO_NIGHT_SKIP || "false",
  loginmsg: process.env.MINECRAFT_LOGIN_MESSAGE || "",
};

fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

mineboty();
