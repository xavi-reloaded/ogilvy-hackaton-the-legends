const yargs = require("yargs");
const fs = require('fs');
const argv = yargs(JSON.parse(process.env.npm_config_argv).original).argv;

console.log(argv);
var args = {};
for(var index = 0; index < argv._.length ; index++){
    if(argv._[index] && argv._[index].substring(0, 2) === '--'){
        var value;
        var key = argv._[index].replace("--", "");
        if(argv._[index+1] && argv._[index+1].substring(0, 2) !== '--'){
            value = argv._[index+1];
        }
        else if(argv._[index].indexOf("=") !== -1){
            var a = argv._[index].split("=");
            key = a[0].replace("--", "");
            value = a[1];
        }
        else{
             value = true;
        }
        args[key] = value;
    }
}

fs.writeFile("./src/environment-variables/env-args.ts", "export const envArgs = "+ JSON.stringify(args) +";", function(err) {
    if(err) {
        return console.log(err);
    }
});
