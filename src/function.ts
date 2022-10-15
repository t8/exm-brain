import brain from "brain.js";
import { StateInterface, ActionInterface } from "./faces";

export async function handle(
  state: StateInterface,
  action: ActionInterface
): Promise<{ state: StateInterface } | any> {
  const inputFunction = action.input.function;
  const inputData = action.input.data;
  let newState = state;

  // Parse input
  if (inputFunction === "train") {
    // Train on new data
    const smarterBrain = train(state.brain, inputData);
    newState.brain = smarterBrain;

    return { state: newState };
  } else if (inputFunction === "run") {
    // Evaluate model provided with data
    const res = run(state.brain, inputData);

    return { result: res };
  } else {
    throw new ContractError("Invalid function call");
  }
}

function train(net: any, data: string) {
  if (net === null) {
    net = new brain.NeuralNetwork();
  }

  data = JSON.parse(data);
  net.train(data);
  return net.toJSON();
}

function run(net: any, data: string) {
  return net.run(data);
}

// async function test() {
//   const update = JSON.stringify(await handle(
//     { brain: null },
//     {
//       input: {"function": "train","data": [{"input":[0,0], "output":{"zero":1}},{"input":[0,1], "output":{"one":1}},{"input":[1,0], "output":{"one":1}},{"input":[1,1], "output":{"zero":1}}]}
//
//
//
//
//
//
//
//
//       caller: "your mom",
//     }
//   ), undefined, 2);
//   console.log("STATE", update);
// }

// test();

// exm function:deploy --src ./dist/function.js --init-state '{"brain": null}' --token 1fd34757a788b5c07e93c59f571ea4c5354f01fd7928f5db5447e6a745484db2598a3696e66e9a69651b4b7e9619
// exm function:write h0nAeVpTSFmLLVg4ao4M2PT77XcOHqUMqQ3z_HvBTL0 --input '{"function": "train","data": [{"input":[0,0], "output":{"zero":1}},{"input":[0,1], "output":{"one":1}},{"input":[1,0], "output":{"one":1}},{"input":[1,1], "output":{"zero":1}}]}' --token 1fd34757a788b5c07e93c59f571ea4c5354f01fd7928f5db5447e6a745484db2598a3696e66e9a69651b4b7e9619
