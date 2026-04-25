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
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function optionalEnv(name, fallback = "") {
  return process.env[name]?.trim() || fallback;
}

function envPort(name, fallback = "25565") {
  const value = optionalEnv(name, fallback);
  const port = Number.parseInt(value, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      `Invalid ${name}: expected a number between 1 and 65535, received "${value}"`
    );
  }

  return String(port);
}

function envBooleanString(name, fallback = "false") {
  const value = optionalEnv(name, fallback).toLowerCase();

  if (value !== "true" && value !== "false") {
    throw new Error(
      `Invalid ${name}: expected "true" or "false", received "${value}"`
    );
  }

  return value;
}

loadEnvFile(envPath);

const config = {
  ip: requiredEnv("MINECRAFT_SERVER_IP"),
  port: envPort("MINECRAFT_SERVER_PORT"),
  name: optionalEnv("MINECRAFT_BOT_NAME", "OnlineBOT"),
  password: optionalEnv("MINECRAFT_PASSWORD"),
  auth: optionalEnv("MINECRAFT_AUTH", "offline").toLowerCase(),
  "auto-night-skip": envBooleanString("MINECRAFT_AUTO_NIGHT_SKIP"),
  loginmsg: optionalEnv("MINECRAFT_LOGIN_MESSAGE", "The server will always be online!"),
};

fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

mineboty();
