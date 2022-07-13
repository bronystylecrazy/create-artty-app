import arg from "arg";
import inquirer from "inquirer";
import { getChoicesFolder } from "./generate";
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
  const questions = [];
  const { languages } = getChoicesFolder();
  if (!options.isTypescript) {
    questions.push({
      type: "list",
      name: "language",
      message: "Please choose which language will be used in this project",
      choices: languages,
      default: languages[0],
    });
  }

  let answers = await prompt(questions);
  questions.length = 0;

  const { projects } = getChoicesFolder(`/${answers.language}`);

  questions.push({
      type: "list",
      name: "project",
      message: "Please choose which project you will use",
      choices: projects,
      default: projects[0],
    });

  answers = {...answers, ...await prompt(questions)};

  return {
    language: options.language || answers.language,
    project: answers.project,
  };
};

export async function cli(args) {
  const options = await createPrompts(parseArgs(args));
  await createProject(options);
}
