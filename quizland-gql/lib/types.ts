import {Item, ItemType} from "../src/__generated__/resolvers-types";
import {ObjectId} from "mongodb";

export type DItem = {type: ItemType, children?: Array<ObjectId>} & Item