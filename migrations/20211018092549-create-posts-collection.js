module.exports = {
  async up(db, client) {
    await db.createCollection('posts')
    await db.collection('posts').createIndex({domainName: 1}, {unique: true, sparse: true});
  },

  async down(db, client) {
    await db.dropDatabase('restAPI')
  }
};
