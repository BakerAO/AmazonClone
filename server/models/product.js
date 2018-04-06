const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');

const ProductSchema = new Schema({

});

ProductSchema.plugin(deepPopulate);
ProductSchema.plugin(mongooseAlgolia, {
    appId: 'KV5XNDATQL',
    apiKey: '864440e1986a9cfd1244d20aa2ad0619',
    indexName: 'amazonov1',
    selector: '',
    populate: {
        path: '',
        select: ''
    },
    defaults: {

    },
    mappings: {

    },
    virtuals: {

    }
});

module.exports = mongoose.model('Product', ProductSchema);