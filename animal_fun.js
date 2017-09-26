const fs = require('fs');

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

let selectAnimals = (animalString, input) => {
  return animalString
    .split('\n')
    .filter(animal => animal.startsWith(input))
    .join('\n')
};

const input = process.argv.slice(2)
fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err){
    console.log(err);
    return;
  }
  let letter = input.map((word) => {
    const animals = selectAnimals(data, word[0].toUpperCase())
    fs.writeFile(`./output/${word[0]}_animals.txt`, animals, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("file successfully written!");
      }
    })
  }) // end letter function
}) // end readFile
