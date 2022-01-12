/** Command-line tool to generate Markov text. */

const fs = require('fs')
const markov = require('./markov')
const axios = require('axios')
const process = require('process')

//Make machine from text and generate new text form it

function genText(text) {
  let mm = new markov.MarkovMachine(text)
  console.log(mm.makeText())
}

//read a file and generate text from machine

function createText(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error(`Cannot read file ${path}: ${err}`)
      process.exit(1)
    } else {
      genText(data)
    }
  })
}

// read a url and create text from url and

async function genURLText(url) {
  let res

  try {
    res = await axios.get(url)
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`)
  }
  genText(res.data)
}

//command line interpretation

let [method, path] = process.argv.slice(2)

if (method === 'file') {
  createText(path)
} else if (method === 'url') {
  genURLText(path)
} else {
  console.error(`Unknown Method: ${method}`)
  process.exit(1)
}
