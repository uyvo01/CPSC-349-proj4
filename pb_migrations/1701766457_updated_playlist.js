/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw5imysi8u8ehhe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmajaa8p",
    "name": "listno",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uw5imysi8u8ehhe")

  // remove
  collection.schema.removeField("dmajaa8p")

  return dao.saveCollection(collection)
})
