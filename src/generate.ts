import YAML from "yaml";
import glob from "glob";
import fs from "fs";
import path from "path";

type NodeType = "Directory" | "File";
type Options = any;

const createNode = (type: NodeType, options: Options, ...children) => {
  if (children) return { type, options, children: children.flat() };
  return { type, options };
};

const generateNodes = (starting: string = "./templates") => {
  const newnodes = [];
  for (const p of fs.readdirSync(starting)) {
    console.log(`Finding in path ${starting}/${p}`);
    const isDir = fs.lstatSync(path.join(starting, p)).isDirectory();
    if (isDir) {
      const newnode = createNode(
        "Directory",
        {
          key: p,
        },
        ...generateNodes(`${starting}/${p}`)
      );
      newnodes.push(newnode);
    } else {
      const newnode = createNode("File", { key: p });
      newnodes.push(newnode);
    }
  }
  return newnodes;
};
const generated = generateNodes();
const json = JSON.stringify(generated, null, 2);
const yaml = YAML.stringify(generated);
fs.writeFileSync(`./src/blueprints/generate.json`, json, "utf-8");
fs.writeFileSync(`./src/blueprints/generate.yaml`, yaml, "utf-8");
