const express = require("express");
const { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategories } = require("../controller/tvController");

const router = express.Router()

router.get("/trending", getTrendingTv)
router.get("/:id/trailers",getTvTrailers)
router.get("/:id/details", getTvDetails)
router.get("/:id/similar",getSimilarTvs)
router.get("/:category",getTvsByCategories)



module.exports = router;