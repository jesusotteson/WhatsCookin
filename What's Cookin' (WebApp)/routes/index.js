const express  = require("express"),
      router   = express.Router(),
      fetch    = require("node-fetch"),
      location = require("../location.config"),
      auth     = require("../auth.config")

/* GET home page. */
router.get("/:id?", function (req, res) {
    let query = "Food"
    if (req.params.id)
        query = req.params.id
    const url = generateQueryURL(query)
    fetch(url)
        .then(res => res.json()) // convert response to json
        .then(json => json.response.groups[0].items) // narrow response to just the venues
        .then(venues => res.render("index", {venues: venues})) // pass the venues data
})

router.post("/:id?", (req, res) => {
    res.redirect(`/${req.body.query}`)
})

function generateQueryURL(query) {
    const baseURL  = "https://api.foursquare.com/v2/venues/explore",
          clientID = `client_id=${auth.id}`,
          secret   = `client_secret=${auth.secret}`,
          version  = `v=${auth.version}`,
          longLat  = `ll=${location.lat},${location.long}`

    return `${baseURL}?${clientID}&${secret}&${version}&${longLat}&query=${query}`
}

module.exports = router
