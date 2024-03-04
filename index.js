let path = require('path');
let fs = require('fs');
let url = require('url');
let http = require('http');


let dataPath = path.join(__dirname, 'data');

const server = http.createServer((req, res) =>{


    if(req.url == '/jokes' && req.method == 'GET'){
        getAllJokes(req, res);
    }

    if(req.url == '/jokes' && req.method == 'POST'){
        addJoke(req, res);
    }

    if(req.url.startsWith('/like')){
        like(req,res);
    }



});
server.listen(3000);

function like(req, res){
    const url = require('url');
    const params = url.parse(req.url, true).query;
    let id = params.id;
    let dir = fs.readdirSync(dataPath);
    if(id){
        if(id > dir.length){
            res.end("Шутки с таким id нет(")
        }else{
            let filePath = path.join(dataPath, id+'.json')
            let file = fs.readFileSync(filePath);
            let jokeJson = Buffer.from(file).toString();
            let joke = JSON.parse(jokeJson);
            joke.likes++;
            fs.writeFileSync(filePath, JSON.stringify(joke));
            res.end(`Ви лайкнули шутку ${id}`)
        }
    }
}

function addJoke(req,res){
    let data ='';
    req.on('data',function(chunk){
        data += chunk;
    });
    req.on('end', function(){
        let joke = JSON.parse(data);
        joke.likes = 0;
        joke.dislikes = 0;
        joke.needShow = true;
        let dir = fs.readdirSync(dataPath);
        let fileName = dir.length+'.json';
        let filePath = path.join(dataPath, fileName);
        fs.writeFileSync(filePath,JSON.stringify(joke));
        res.end();
    });
}

function getAllJokes(req, res){
    let dir = fs.readdirSync(dataPath);
    let allJokes = [];
    for(let i = 0; i < dir.length; i++){
        let file = fs.readFileSync(path.join(dataPath, i+'.json'));
        let jokeJson = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJson);
        joke.id = i;
        allJokes.push(joke);
    }
    res.end(JSON.stringify(allJokes));
}





































// for(let i = 0; i < 100; i++){
//     let filePath = path.join(dataPath, i+'.json');
//     let trueJoke = {
//         id: i,
//         content: `${joke.getRandomJoke().body}`,
//         likes: 0,
//         dislikes: 0,
//         needShow: true
//     }

//     fs.writeFileSync(filePath,
//         JSON.stringify(trueJoke));
// }