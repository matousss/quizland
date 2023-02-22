import {QuizDB, to__id} from "../../../../lib/mongodb";
import {Card, CardSet, Item, ItemType, MutationCreateCardSetArgs} from "../../../__generated__/resolvers-types";
import {GQLError, InvalidUserInput, WriteError} from "../../../../lib/graphql/error";
import {DItem} from "../../../../lib/types";


export const getMutationResolvers = (db: QuizDB) => {


    return {
        createCardSet: async (_, args: MutationCreateCardSetArgs, {user}) => {
            if (args.cards.length < 2) throw new InvalidUserInput("Minimal cardset size is 2");

            let item: DItem = {
                name: args.name,
                owner: user._id,
                type: ItemType.CardSet,
                permissions: []
            };

            let cards = args.cards.map(value => [value.term, value.definition]);

            if (args.description !== undefined) item.description = args.description;
            let folder
            if (args.folder !== undefined) {
                folder = await db.Items.findOne({_id: to__id(args.folder)});
                if (!folder) throw new InvalidUserInput(`Folder with id ${args.folder} doesn't exist`);
            }
            let session = await db.client.startSession();
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
                cards: args.cards,
                owner: user,
                ...item
            } as CardSet

        }
    }
}