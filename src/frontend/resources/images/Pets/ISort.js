const fs = require('fs');
const path = require('path');

let colours = ["Blue", "Orange", "Purple", "Red", "Green"]

let exlcude = ['base', 'ComingSoon']

// export const toeny = {
// 	Happy: {
// 		Blue: require('./legsHappyBlue.gif'),
// 		Green: require('./legsHappyGreen.gif'),
// 		Orange: require('./legsHappyOrange.gif'),
// 		Purple: require('./legsHappyPurple.gif'),
// 		Red: require('./legsHappyRed.gif'),
// 	},
// };
module.exports.createDirs = function () {
    fs.readdirSync('./Evolutions').forEach((file) => {
        const newDir = file.slice(0, -4).toLowerCase()
        if(!fs.existsSync(newDir))
            fs.mkdirSync(newDir)
        let newFiles = []
        for(colour of colours) {
            var newFileDir = newDir+'Happy'+colour+'.gif';
            fs.copyFile('./Evolutions/'+file, newDir+'/'+newFileDir,
                        (error) => console.log(error))
            newFiles.push(newFileDir)
        }
        let dirs = 
        "export const " + newDir + " = { \n" +
        "\tHappy: {\n";
        for(let index in newFiles)
            dirs += "\t\t" + colours[index] + ": require('./" + newFiles[index] + "'),\n"
        dirs += "\t},\n};"
        fs.writeFile('./'+newDir+'/'+newDir+'.js', dirs, (err) => console.log(err))
    }) 
}

module.exports.appendMapping = function () {
    fs.writeFileSync('./mapping.js', 'export const ImageMapping = {\n');
    fs.readdirSync('./').forEach((file) => {
        fs.appendFileSync('./mapping.js', '\t'+file+": " + "require('./"+ file + "/" + file +"'),\n");
    }) 
    fs.appendFileSync('./mapping.js', '}')
}