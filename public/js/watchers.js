var watchersCount = function (user, cb,access_token) {
    var https = require('https')
    opts = parseOpts(process.argv.slice(3))

    request('/users/' + user, function (res) {
        if (!res.public_repos) {
            console.log(res.message)
            return
        }
        var pages = Math.ceil(res.public_repos / 100),
            i = pages,
            repos = []
        while (i--) {
            request('/users/' + user + '/repos?per_page=100&page=' + (i + 1), check)
        }
        function check(res) {
            repos = repos.concat(res)
            pages--
            if (!pages) {
                var total = output(repos)
                cb(total)
            }
        }
    })

    function request(url, cb) {
        https.request({
            hostname: 'api.github.com',
            path: url,
            headers: { 'User-Agent': 'GitHub StarCounter','Authorization': 'token '+ access_token  }

        }, function (res) {
            var body = ''
            res
                .on('data', function (buf) {
                    body += buf.toString()
                })
                .on('end', function () {
                    cb(JSON.parse(body))
                })
        }).end()
    }

    function output(repos) {
        var total = 0,
            longest = 0,
            list = repos
                .filter(function (r) {
                    total += r.watchers_count
                    if (r.watchers_count >= opts.thresh) {
                        if (r.name.length > longest) {
                            longest = r.name.length
                        }
                        return true
                    }
                })
                .sort(function (a, b) {
                    return b.watchers_count - a.watchers_count
                })

        if (list.length > opts.limit) {
            list = list.slice(0, opts.limit)
        }

        return total;

		/* console.log('\nTatal: ' + total + '\n')
		console.log(list.map(function (r) {
			return r.name +
				new Array(longest - r.name.length + 4).join(' ') +
				'\u2605  ' +
				r.stargazers_count
		}).join('\n')) */
    }

    function parseOpts(args) {
        var opts = {
            thresh: 1,
            limit: Infinity
        }
        args.forEach(function (a, i) {
            var next = args[i + 1]
            if (a === '-t') {
                opts.thresh = parseInt(next, 10) || 1
            } else if (a === '-l') {
                opts.limit = parseInt(next, 10) || Infinity
            }
        })
        return opts
    }
}

module.exports = watchersCount