module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.createCollection( "restAPI", { capped : true, size : 5242880, max : 5000 })
    await db.collection('restAPI').createIndex({domainName: 1}, {unique: true, sparse: true});

    await db.collection('restAPI').insertOne({ domainName: 'The Beatles', ownerName: 'wwww', ownerId: '1112w' }, { $set: { blacklisted: true } });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.dropDatabase("restAPI")
  }
};
