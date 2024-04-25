import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const npmJobs = [
  { command: "help", description: "Show available commands" },
  { command: "lint", description: "Run ESLint to lint code " },
  {
    command: "dev",
    description:
      "Start the development server with optional port --port and backend port --backend options ",
  },
  { command: "build", description: "Build the project for production" },
  { command: "preview", description: "Preview the built project" },
];

yargs(hideBin(process.argv))
  .command(
    "help-sveltos",
    "Show help for NPM jobs",
    (yargs) => {
      console.log("Available jobs:");
      npmJobs.forEach(({ command, description }) => {
        console.log(`- ${command}: ${description}`);
      });
    },
    (argv) => {},
  )
  .parse();
