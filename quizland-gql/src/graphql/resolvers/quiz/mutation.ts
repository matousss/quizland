import {DBClient, parseIfNumber} from "../../../../lib/mongodb";
import {
    CardSet,
    ItemType,
    MutationCreateCardSetArgs,
    MutationResolvers
} from "../../resolvers-types";
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
                permissions: args.permissions,
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

            if (!response.ok) throw new WriteError("Cannot create CardSet")

            return {
                id: insertedId,
                cards: cards,
                owner: user,
                ...item
            }

        },

        updateCards: async (_, {id, cards}) => {
            let dbId = parseIfNumber(id)

            const session = await mongo.startSession();
            if (await db.Cards.findOne({_id: dbId}) === null) throw new InvalidUserInput("CardSet doesn't exist")

            try {
                await session.withTransaction(async () => {
                    // @ts-ignore
                    await db.Cards.updateOne({_id: dbId}, {$set:{cards: cards}}, {session})
                    await db.Items.updateOne({_id: dbId}, {$set:{modified: new Date()}}, {session});


                })
            } finally {
                await session.endSession()
            }
            // @ts-ignore
            let {_id, ...rest} = await db.Items.findOne({_id: dbId})

            return {
                id: id,
                cards: cards,
                ...rest
            }
        },
        updateItem: async (_, {id, name, description}) => {
            let dbId = parseIfNumber(id)

            await db.Items.updateOne({_id: dbId}, {$set: {name: name, description: description, modified: new Date()}})

            let response =  await db.Items.findOne({_id: dbId})
            if (!response) throw new WriteError("Cannot update item, because it doesn't exist")

            return

        }
    }
}