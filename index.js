// Change this to the command you want to run
const command = "lscpu && free -h";

import { spawn } from "node:child_process";

function runShellCommand(commandStr) {
  const child = spawn(commandStr, { shell: true, stdio: "pipe" });

  child.stdout.on("data", (chunk) => {
    Deno.stdout.write(new TextEncoder().encode(chunk));
  });

  child.stderr.on("data", (chunk) => {
    Deno.stderr.write(new TextEncoder().encode(chunk));
  });

  child.on("close", (code, signal) => {
    console.log(`\nChild process exited with code ${code}${signal ? `, signal ${signal}` : ""}`);
  });

  child.on("error", (err) => {
    console.error("Failed to start child process:", err);
  });
}

// Run the command
runShellCommand(command);
