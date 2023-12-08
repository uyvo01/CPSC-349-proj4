/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("d6ecd37rgpiczvr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "phjufwvx",
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
  const collection = dao.findCollectionByNameOrId("d6ecd37rgpiczvr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "phjufwvx",
    "name": "listname",
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
})
