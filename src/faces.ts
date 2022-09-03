import { INeuralNetworkJSON } from "brain.js/dist/src/neural-network";

export interface StateInterface {
  brain: any;
}

export interface ActionInterface {
  input: InputInterface;
  caller: string;
}

export interface InputInterface {
  function: "train" | "run";
  data: string;
}
