import {DBClient} from "../../../../lib/mongodb";
import {ItemType, QueryResolvers} from "../../resolvers-types";
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
            let idNum = parseInt(id)
            let lookFor = !isNaN(idNum) ? idNum : id;

            // @ts-ignore
            let item = await db.Items.findOne({_id: lookFor});

            if (!item) return null;
            let {_id, owner, ...rest} = item;

            let cards = await db.Cards.findOne({_id: item._id});
            if (!cards) return null;

            // @ts-ignore
            let ownerUser
            let ownerID
            let ownerRaw
            if (owner.toString().startsWith('@')) {
                ownerRaw = specialUsers[owner.toString().replace('@', '')]
            }

            else {
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
        }
    }
}