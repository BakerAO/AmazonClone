const config = require('../config.js');

const router = require('express').Router();
const algoliaSearch = require('algoliasearch');
const client = algoliaSearch(config.algoliaAppId, config.algoliaSearchOnlyApiKey);
const index = client.initIndex(config.algoliaIndexName);

router.get('/', (req, res, next) => {
    if(req.query.query) {
        index.search(
            {
                query: req.query.query,
                page: req.query.page
            },
            (err, content) => {
                res.json({
                    success: true,
                    message: "Here is your search",
                    status: 200,
                    content: content,
                    search_result: req.query.query
                });
            }
        );
    }
});

module.exports = router;