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

async function test() {
  const update = JSON.stringify(await handle(
    { brain: null },
    {
      input: {
        function: "train",
        data: JSON.stringify([
          {input:[0,0], output:{zero:1}},
          {input:[0,1], output:{one:1}},
          {input:[1,0], output:{one:1}},
          {input:[1,1], output:{zero:1}},
         ]),
      },
      caller: "your mom",
    }
  ), undefined, 2);
  console.log("STATE", update);  
}

test();