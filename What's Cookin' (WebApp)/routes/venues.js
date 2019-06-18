const express = require("express"),
      router  = express.Router(),
      fetch   = require("node-fetch"),
      auth    = require("../auth.config")

router.get("/:id", (req, res) => {
    const url = generateDetailsURL(req.params.id)
    fetch(url)
        .then(res => res.json())
        .then(json => json.response)
        .then(details => {
            res.render("venue", {
                title  : details.venue.name,
                details: details,
            })
        })
})

function generateDetailsURL(query) {
    const baseURL  = "https://api.foursquare.com/v2/venues/",
          clientID = `client_id=${auth.id}`,
          secret   = `client_secret=${auth.secret}`,
          version  = `v=${auth.version}`

    return `${baseURL}${query}?${clientID}&${secret}&${version}`
}


module.exports = router
