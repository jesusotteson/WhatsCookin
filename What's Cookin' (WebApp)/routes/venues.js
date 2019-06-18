const express = require("express"),
      router  = express.Router()
const fetch = require("node-fetch")

router.get("/:id", (req, res) => {
    const clientID       = "5DJBXJWUMPLNUCXGU5CQPHMHB54RRB3NIM3PTFH5KIQ2X5W5",
          clientSecret   = "P4V2QNB5XKBSQAFD42RGTW2AP2W2ZJ23HGP13M4XT0ISQGR2",
          authentication = `client_id=${clientID}&client_secret=${clientSecret}&v=20180323`,
          url            = `https://api.foursquare.com/v2/venues/${req.params.id}?${authentication}`

    fetch(url)
        .then(res => res.json())
        .then(json => json.response)
        .then(details => {
            res.render("venue", {title: details.venue.name, details: details})
        })
})

module.exports = router
