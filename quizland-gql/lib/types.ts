import {Card, Item, ItemType} from "../src/graphql/resolvers-types";
import {ObjectId} from "mongodb";

export type DItem = {type: ItemType} & Omit<Item, 'id'> & {_id: number | string, owner: ObjectId}

export type DFolder = DItem & {children: Array<ObjectId>}

export type DCard = Card
export type DCardSet = {
    _id: number | string,
    cards: Array<DCard>

}