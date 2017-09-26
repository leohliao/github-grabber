const fs = require('fs');
const qs = require('querystring');
const http = require('http');
const https = require('https');

// const githubServer = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     let body = ''
//     req.on('data', d => {
//       // d is an instance of Buffer,
//       // toString is implicitly called when we add it to body
//       body += d
//     })
//     req.on('end', () => {
//       // qs.parse will give us a nice object to retrieve the value
//       const username = qs.parse(body).username
//       res.end(username)
//     })
//   } else {
//
//     res.end("Danger, not a POST request!");
//   }
// })
//
// githubServer.listen(8080, () => console.log('listening on 8080'));

function buildOptionsObj (username) {
  return {
    hostname: `api.github.com`,
    path: `/users/${username}/starred`,
    headers: {
      'User-Agent': 'github-grabber'
    }
  }
}

const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let requestBody = ''
    req.on('data', chunk => {
      requestBody += chunk
    })
    req.on('end', () => {
      const username = qs.parse(requestBody).username
      const ws = fs.createWriteStream(`./${username}_starred_repos.txt`)
      const opts = buildOptionsObj(username)
      https.get(opts, (dataStream) => {
        let repoData = ''
        dataStream.on('data', chunk => { repoData += chunk })
        dataStream.on('end', () => {
          const repos = JSON.parse(repoData).map(repo => {
            return `Repo: ${repo.name}. Stars: ${repo.stargazers_count}.`
          }).join('\n')
          ws.write(repos)
          res.end(repos)
        })
      })
    })
  }
})

githubServer.listen(8080, () => console.log('Listening on 8080'))
