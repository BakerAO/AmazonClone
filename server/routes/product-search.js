const router = require('express').Router();
const algoliaSearch = require('algoliasearch');
const client = algoliaSearch('KV5XNDATQL', '864440e1986a9cfd1244d20aa2ad0619');
const index = client.initIndex('amazonov1');

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