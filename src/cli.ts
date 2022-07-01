import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";
const prompt = inquirer.createPromptModule();
export const parseArgs = (rawArgs) => {
  const args = arg(
    {
      "--install": Boolean,
      "--typescript": Boolean,
      "-ts": "--typescript",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    runInstall: args["--install"] || false,
    isTypescript: args["--typescript"] || false,
  };
};

export const createPrompts = async (options) => {
  const defaultLanguage = "Javascript";
  const questions = [];

  if (!options.isTypescript) {
    questions.push({
      type: "list",
      name: "language",
      message: "Please choose which language will be used in this project",
      choices: ["Javascript", "Typescript"],
      default: defaultLanguage,
    });
  }

  const answers = await prompt(questions);

  return {
    language: options.language || answers.language,
  };
};

export async function cli(args) {
  const options = await createPrompts(parseArgs(args));
  await createProject(options);
}
