import {DBClient, parseIfNumber} from "../../../../lib/mongodb";
import {CardSet, Item, ItemType, QueryResolvers, User} from "../../resolvers-types";
import {specialUsers} from "../../context";

export const getQueryResolvers = (dbClient: DBClient): QueryResolvers => {
    const db = dbClient.quiz;
    const Users = dbClient.auth.Users;


    return {
        discoverCardSets: async () => {
            let items = await db.Items.find({type: ItemType.CardSet}, {limit: null}).toArray();

            return items.map(item => item._id.toString())
        },
        getCardSet: async (_, {id}) => {
            let lookFor = parseIfNumber(id);

            // @ts-ignore
            let item = await db.Items.findOne({_id: lookFor});

            if (!item) return null;
            let {_id, owner, ...rest} = item;

            // @ts-ignore
            let cards = await db.Cards.findOne({_id: item._id});
            if (!cards) return null;

            // @ts-ignore
            let ownerUser
            let ownerID
            let ownerRaw
            if (owner.toString().startsWith('@')) {
                ownerRaw = specialUsers[owner.toString().replace('@', '')]
            } else {
                // @ts-ignore
                ownerUser = await Users.findOne({_id: owner});
                let {_id, ...rest} = ownerUser;
                ownerRaw = rest;
                ownerID = _id.toString();
            }


            return {
                id: id,
                ...cards,
                owner: {
                    id: ownerID,
                    ...ownerRaw
                },
                ...rest

            }
        },
        getItem: async (_, {id}) => {
            let dbId = parseIfNumber(id)
            let item = await db.Items.findOne({_id: dbId})
            if (!item) return null;

            let {_id, ...rest} = item;
            return {
                id: id,
                ...rest,
            }

        },
        searchCardSets: async (_, {query}) => {
            let items = await db.Items.find({
                type: ItemType.CardSet,
                name: {$regex: '(?i)' + query}
            }, {limit: null}).toArray();
            items = items.filter(item => item.permissions === null)
            return await Promise.all(items.map(async (item) => {
                let {_id, owner, ...rest} = item;
                return {
                    id: _id.toString(),
                    ...rest,
                    owner: {
                        id: owner.toString(),
                        ...(await dbClient.auth.Users.findOne({_id: owner}))
                    } as User,
                    ...(await db.Cards.findOne({_id: item._id}))
                } as CardSet
            }))
        },
        fetchCardSets: async (_, __, ctx) => {
            let user = ctx.user;
            if (!user) return [];

            let items = await db.Items.find({owner: user._id, type: ItemType.CardSet}).toArray();

            return items.map(item => {
                let {_id, owner, ...rest} = item;
                return {
                    id: _id.toString(),
                    ...rest,
                    owner: {
                        id: owner.toString(),
                        ...(user)
                    } as User
                } as Item
            })

        }
    }
}