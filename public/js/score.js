var starsCount = require('./stars.js')

starsCount('christopheranderton', function (total) {
	console.log(total)
})

var issuesCount = require('./openIssues.js')

issuesCount('christopheranderton', function (total1) {
	console.log(total1)
})

var forksCount = require('./forks.js')

forksCount('christopheranderton', function (total2) {
	console.log(total2)
})

var watchersCount = require('./watchers.js')

watchersCount('christopheranderton', function (total3) {
	console.log(total3)
})


var technologielist = require('./technologie.js')

technologielist('christopheranderton', function (technologie) {
	console.log(technologie)
})

var nbrprojetcount = require('./nbrprojet.js')

nbrprojetcount('christopheranderton', function (nbr) {
	console.log(nbr)
})

var getImag = require('./image.js')

getImag('christopheranderton', function (image) {
	console.log(image)
})