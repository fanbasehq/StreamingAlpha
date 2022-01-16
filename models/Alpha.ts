import Moralis from "moralis";

export interface AlphaAttributes {
  addresses?: string[];
  author: Moralis.User;
  contracts?: string[];
  hlsUrl?: string;
  name?: string;
  notes?: string;
  streamId?: string;
}

export default class Alpha extends Moralis.Object<AlphaAttributes> {
  constructor(attrs: AlphaAttributes) {
    super("Alpha", attrs);
  }
}

Moralis.Object.registerSubclass("Alpha", Alpha);
