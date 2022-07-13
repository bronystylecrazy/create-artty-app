import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import YAML from 'yaml';
import ejs from 'ejs';
import stream from 'stream'
import inquirer from "inquirer";
const prompt = inquirer.createPromptModule();
import execa from "execa";
import listr from 'listr';

const Transform = stream.Transform;

const access = promisify(fs.access);
const copy = promisify(ncp);

const unlinkSync = promisify(fs.unlink);

const templateTransform = (template = {}) => new Transform({
  transform(chunk, encoding, callback) {
    const changed = ejs.render(chunk.toString(), template);
      this.push(changed);
      callback();
  }
})

async function copyTemplateFiles(options, template) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
    transform: (read, write, file) => {
      read.pipe(templateTransform(template)).pipe(write);
    }
  });
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };
  const currentFileUrl = import.meta.url;

  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
   `${options.language.trim()}/${options.project.trim()}`
  ).replaceAll('C:\\C:\\','C:\\');
  options.templateDirectory = templateDir;

  const templateFile = fs.readFileSync(path.join(options.templateDirectory, "__template__.yaml"), 'utf8');
  const template = YAML.parse(templateFile);
  // console.log(template);
  const questions = Object.entries(template).map(([key, value]) => value);
  const parsedQuestions = {};

  for (const question of questions) {
    const answer = await prompt(question as any);
    Object.assign(parsedQuestions, answer);
  }

  const {runInstall} =  await prompt({
    type: "confirm",
    name: "runInstall",
    message: "Do you want to install dependencies?",
    default: true,
  });

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(`%s Invalid template name`, chalk.red.bold("ERROR"));
    process.exit(1);
  }

  // console.log(`%s Copying the project template..`, chalk.yellow.bold("PROGRESS"));
  // console.log(`%s Project created successfully!`, chalk.green.bold("SUCCESS"));
  
  const tasks = new listr([
    {
      title: "Copying the project template..",
      task: () => copyTemplateFiles(options, parsedQuestions)
    },
    {
      title: "Installing dependencies..",
      task: () => execa("npm", ["install"], { cwd: options.targetDirectory }),
      skip: () => !runInstall,
    }
  ]);

  await tasks.run();

  unlinkSync(path.join(options.targetDirectory, "__template__.yaml"));

  console.log(`%s Project created successfully!`, chalk.green.bold("SUCCESS"));
}
