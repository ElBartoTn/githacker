var starsCount = require('./stars.js')

starsCount('chriswhong', function (total) {
	console.log(total)
})

var issuesCount = require('./openIssues.js')

issuesCount('chriswhong', function (total) {
	console.log(total)
})

var forksCount = require('./forks.js')

forksCount('chriswhong', function (total) {
	console.log(total)
})

var watchersCount = require('./watchers.js')

watchersCount('chriswhong', function (total) {
	console.log(total)
})