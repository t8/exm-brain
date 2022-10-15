import { TestFunction, createWrite, FunctionType } from "@execution-machine/sdk";
import { readFileSync } from "fs";
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(FunctionType.JAVASCRIPT);
TestFunction({
     functionSource: readFileSync(path.resolve(__dirname, "../dist/function.js")),
     functionType: FunctionType.JAVASCRIPT,
     functionInitState: {
        brain: null
     },
     writes: [createWrite({"function": "train","data": [{"input":[0,0], "output":{"zero":1}},{"input":[0,1], "output":{"one":1}},{"input":[1,0], "output":{"one":1}},{"input":[1,1], "output":{"zero":1}}]})]
 }).then(console.log);