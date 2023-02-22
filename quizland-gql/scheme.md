# Data scheme

Data stored in mongodb have different structure than structure defined in `scheme.graphql`


## User

### Example
```json
{
  "_id": ObjectId("5c9b9b9b9b9b9b9b9b9b9b9b"),
  "surname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "email": "john@doe.foo",
  "emailVerified": true
}
```

[...]



## CardSet
Card set is defined by `Item` and `Cards` collection. Both collections have the same `_id` field.
Item collection contains information about card set, like name, description, owner, permissions, etc.
Cards collection contains array of cards (term + definitions).

### Example

```json
Item:{
  "_id": ObjectId("<ItemID>"),
  "name": "Item name",
  "description": "Item description",
  "type": "folder|cardset|quiz",
  "owner": ObjectId("<UserID>"),
  "permissions": {
        ObjectId("<AnotherUserID>"): "r|w|m",
        ...
  }
}

Cards: {
  _id: ObjectId("<ItemID>"),
    cards: [
        ['car', ['das Auto', 'Auto']]
        ...
    ]
}
```