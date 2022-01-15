import Moralis from "moralis";

export interface AlphaAttributes {
  name?: string;
}

export default class Alpha extends Moralis.Object<AlphaAttributes> {
  constructor(attrs?: AlphaAttributes) {
    super("Alpha", attrs);
  }
}

Moralis.Object.registerSubclass("Alpha", Alpha);
