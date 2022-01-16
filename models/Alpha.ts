import Moralis from "moralis";

export interface AlphaAttributes {
  author: Moralis.User;
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
