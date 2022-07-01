import { Directory, File, h } from "./lib";
let message = "hello";
const template = () => {
  return (
    <Directory key="template">
      <File key="test.js" out={message + `out.js`} />
      {message}
    </Directory>
  );
};

console.log(JSON.stringify(template()));
