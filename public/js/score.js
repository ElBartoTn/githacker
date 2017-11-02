var starsCount = require('./stars.js')



starsCount('chriswhong', function (total) {
	console.log( 'stars '+total)
})

var issuesCount = require('./openIssues.js')

issuesCount('chriswhong', function (total) {
	console.log('issues'+total)
})

var forksCount = require('./forks.js')

forksCount('chriswhong', function (total) {
	console.log('forks'+total)
})

var watchersCount = require('./watchers.js')

watchersCount('chriswhong', function (total) {
	console.log('watcher'+total)

})

