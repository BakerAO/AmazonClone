const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);
//const mongooseAlgolia = require('mongoose-algolia');

const ProductSchema = new Schema(
    {
        category: { type: Schema.Types.ObjectId, ref: 'Category'},
        owner: { type: Schema.Types.ObjectId, ref: 'User'},
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
        image: String,
        title: String,
        description: String,
        price: Number,
        created: { type: Date, default: Date.now }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

ProductSchema
    .virtual('averageRating')
    .get(function() {
        let rating = 0;
        if(this.reviews.length === 0){
            rating = 0;
        } else {
            this.reviews.map((review) => {
                rating += review.rating;
            });
            rating = rating / this.reviews.length;
        }
        return rating;
    })
;

ProductSchema.plugin(deepPopulate);
// ProductSchema.plugin(mongooseAlgolia, {
//     appId: 'KV5XNDATQL',
//     apiKey: '864440e1986a9cfd1244d20aa2ad0619',
//     indexName: 'amazonov1',
//     selector: '',
//     populate: {
//         path: '',
//         select: ''
//     },
//     defaults: {

//     },
//     mappings: {

//     },
//     virtuals: {

//     }
// });

module.exports = mongoose.model('Product', ProductSchema);