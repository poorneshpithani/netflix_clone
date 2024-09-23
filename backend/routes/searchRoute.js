const express = require("express");
const { searchPerson, searchMovie, searchTv, searchHistory, removeItemFromSearchHistory } = require("../controller/searchController");

const router = express.Router()

router.get("/person/:query",searchPerson)
router.get("/movie/:query",searchMovie)
router.get("/tv/:query",searchTv)

router.get("/history", searchHistory)
router.delete("/history/:id", removeItemFromSearchHistory)


module.exports = router;