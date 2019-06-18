const express = require("express"),
      router  = express.Router()
const fetch = require("node-fetch")

/* GET home page. */
router.get("/", function (req, res, next) {
    const clientID       = "5DJBXJWUMPLNUCXGU5CQPHMHB54RRB3NIM3PTFH5KIQ2X5W5",
          clientSecret   = "P4V2QNB5XKBSQAFD42RGTW2AP2W2ZJ23HGP13M4XT0ISQGR2",
          lat            = "40.670020",
          long           = "-111.945190",
          limit          = 5,
          authentication = `client_id=${clientID}&client_secret=${clientSecret}&v=20180323`,
          url     = `https://api.foursquare.com/v2/venues/explore?${authentication}&limit=${limit}&ll=${lat},${long}&section=food`

    fetch(url)
        .then(res => res.json())
        .then(json => json.response.groups[0].items)
        .then(venues => {
            console.log(url)
            res.render("index", {title: "Express", venues: venues})
        })

})

module.exports = router
