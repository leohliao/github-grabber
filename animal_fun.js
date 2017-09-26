const fs = require('fs');
const http = require('http');
const qs = require('querystring');
const result = {};

////////////////////////////////////////////////////////////////////////
/// Part I
// // read the text file
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err){
//     console.log(err);
//     return;
//   }
//   console.log(data);
// }) // end readFile

// fs.writeFile('./example.txt', 'I will be written to example.txt', err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("file successfully written!");
//   }
// })
//
// console.log(process.argv);

////////////////////////////////////////////////////////////////////////
/// Part II
// let selectAnimals = (animalString, input) => {
//   return animalString
//     .split('\n')
//     .filter(animal => animal.startsWith(input))
//     .join('\n')
// };
//
// const input = process.argv.slice(2)
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err){
//     console.log(err);
//     return;
//   }
//   let letter = input.map((word) => {
//     const animals = selectAnimals(data, word[0].toUpperCase())
//     fs.writeFile(`./output/${word[0]}_animals.txt`, animals, err => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("file successfully written!");
//       }
//     })
//   }) // end letter function
// }) // end readFile

////////////////////////////////////////////////////////////////////////
///Part III
// const server = http.createServer((req, res) => {
//   res.write('hello world');
//   res.end();
// })
//
// server.listen(8000, () => console.log("I'm listening on port 8000!"));

////////////////////////////////////////////////////////////////////////
///Part IV
const server = http.createServer((req, res) => {
  const query = req.url.split('?')[1]
  if (query !== undefined) {
    const letter = qs.parse(query).letter.toUpperCase();

    let selectAnimals = (animalString, input) => {
      return animalString
        .split('\n')
        .filter(animal => animal.startsWith(input))
        .join('\n')
    };

    if (result[letter] !== undefined) {
      res.end(result[letter])
    } // end if

    if (letter !== undefined) {
      fs.readFile('./animals.txt', 'utf-8', (err, data) => {
        if (err){
          console.log(err);
          res.end("Not found");
          return;
        }
        const animals = selectAnimals(data, letter)
        result[letter] = animals
        res.end(animals)
      }) // end readFile
    } // end if
  } else {
    if (result['animals'] !== undefined) {
      res.end(result['animals'])
    }
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err){
        console.log(err);
        res.end("Not found");
        return;
      }
      result['animals'] = data
      res.end(data)
    }) // end readFile
  }
}) // end server

server.listen(8000, () => console.log("I'm listening on port 8000!"));
