import {Card, Item, ItemType} from "../src/__generated__/resolvers-types";
import {ObjectId} from "mongodb";

export type DItem = {type: ItemType} & Item & {_id: number}

export type DFolder = DItem & {children: Array<ObjectId>}

export type DCard = Card
export class DCardSet {
    _id: number
    cards: Array<DCard>

}