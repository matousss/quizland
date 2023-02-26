import {DBClient} from "../../../../lib/mongodb";
import {ItemType, QueryResolvers} from "../../resolvers-types";

export const getQueryResolvers = (dbClient: DBClient): QueryResolvers => {
    const db = dbClient.quiz;
    const Users = dbClient.auth.Users;


    return {
        discoverCardSets: async () => {
            let items = await db.Items.find({type: ItemType.CardSet}, {limit: null}).toArray();

            return items.map(item => item._id.toString())
        },
        getCardSet: async (_, {id}) => {
            let item = await db.Items.findOne({_id: parseInt(id)});
            if (!item) return null;
            let {_id, owner, ...rest} = item;

            let cards = await db.Cards.findOne({_id: item._id});
            if (!cards) return null;

            // @ts-ignore
            let ownerUser = await Users.findOne({_id: owner});

            return {
                id: id,
                ...cards,
                owner: {
                    id: ownerUser._id.toString(),
                    ...ownerUser
                },
                ...rest

            }
        }
    }
}