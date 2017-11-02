var starsCount = require('./stars.js')

starsCount('devrecipe', function (total) {
	console.log(total)
})

var issuesCount = require('./openIssues.js')

issuesCount('devrecipe', function (total1) {
	console.log(total1)
})

var forksCount = require('./forks.js')

forksCount('devrecipe', function (total2) {
	console.log(total2)
})

var watchersCount = require('./watchers.js')

watchersCount('devrecipe', function (total3) {
	console.log(total3)
})