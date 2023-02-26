import {DBClient} from "../../../../lib/mongodb";
import {CardSet, ItemType, MutationCreateCardSetArgs, MutationResolvers} from "../../resolvers-types";
import {InvalidUserInput, WriteError} from "../../../../lib/graphql/error";
import {DItem} from "../../../../lib/types";


export const getMutationResolvers = (dbClient: DBClient): MutationResolvers => {
    const mongo = dbClient.mongoClient;
    const db = dbClient.quiz;

    return {
        createCardSet: async (_, args: MutationCreateCardSetArgs, {user}): Promise<CardSet> => {
            if (args.cards.length < 2) throw new InvalidUserInput("Minimal cardset size is 2");


            let cards = args.cards

            let folder
            if (args.folder !== undefined) {
                folder = await db.Items.findOne({_id: parseInt(args.folder)});
                if (!folder) throw new InvalidUserInput(`Folder with id ${args.folder} doesn't exist`);
            }

            let item: DItem = {
                _id: await db.getID(),
                name: args.name,
                owner: user._id,
                type: ItemType.CardSet,
                permissions: [],
                modified: new Date(),
            };
            if (args.description !== undefined) item.description = args.description;

            let session = await mongo.startSession();
            let response;
            let insertedId

            try {
                response = await session.withTransaction(async () => {
                    let insertOneResult = await db.Items.insertOne(item, {session});
                    insertedId = insertOneResult.insertedId
                    await db.Cards.insertOne({_id: insertedId, cards: cards})

                    if (folder) {
                        folder.children.push(insertedId)
                        await db.Items.updateOne({_id: folder._id}, {children: folder.children}, {session})
                    }
                })
            } finally {
                await session.endSession()
            }

            if (!response.ok) throw new WriteError("Cannot create cardset")

            return {
                id: insertedId,
                cards: cards,
                owner: user,
                ...item
            }

        }
    }
}