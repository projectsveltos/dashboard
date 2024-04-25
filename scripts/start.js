import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import { execSync } from "child_process";

yargs(hideBin(process.argv))
  .command(
    "dev [port]",
    "start the development server",
    (yargs) => {
      return yargs
        .positional("port", {
          describe: "port to run the server on",
          default: 3000,
        })
        .option("backend", {
          alias: "b",
          describe: "The backend port",
          type: "number",
          default: 9000,
        });
    },
    (argv) => {
      console.log("Starting server with the following options:");
      console.log(`- Port: ${argv.port}`);
      console.log(`- Backend: ${argv.backend}`);
      execSync(`echo "VITE_BACKEND_PORT=${argv.backend}" > .env`);
      // Run TypeScript compiler
      execSync(`tsc`);

      // Run Prettier
      execSync(`npx prettier --write .`);
      execSync(`vite --port ${argv.port}`, { stdio: "inherit" });
    },
  )
  .parse();
