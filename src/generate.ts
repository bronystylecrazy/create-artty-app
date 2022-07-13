import YAML from "yaml";
import glob from "glob";
import fs from "fs";
import path from "path";


export const getChoicesFolder = (folder="") => {
    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        "../../templates"
    ).replace(`C:\\C:\\`,'C:\\');
    const targetDir = path.join(`${templateDir}${folder}`, `./**/*.yaml`).replaceAll('\\','/');
    const choices = glob.sync(targetDir);
    const projects = choices.map(choice => path.basename(path.dirname(choice)))
        const languages = Array.from(new Set(choices.map(choice => path.basename(path.dirname(path.dirname(choice))))));
    return { projects, languages};
}