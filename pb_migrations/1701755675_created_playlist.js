/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uw5imysi8u8ehhe",
    "created": "2023-12-05 05:54:35.653Z",
    "updated": "2023-12-05 05:54:35.653Z",
    "name": "playlist",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "adfpclhg",
        "name": "username",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "v4gqqxuq",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uw5imysi8u8ehhe");

  return dao.deleteCollection(collection);
})
