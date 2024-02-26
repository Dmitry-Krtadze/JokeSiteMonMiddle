let joke = require('one-liner-joke');
let path = require('path');
let fs = require('fs');
let url = require('url');


let dataPath = path.join(__dirname, 'data');

for(let i = 0; i < 100; i++){
    let filePath = path.join(dataPath, i+'.json');
    let trueJoke = {
        id: i,
        content: `${joke.getRandomJoke().body}`,
        likes: 0,
        dislikes: 0,
        needShow: true
    }

    fs.writeFileSync(filePath,
        JSON.stringify(trueJoke));
}