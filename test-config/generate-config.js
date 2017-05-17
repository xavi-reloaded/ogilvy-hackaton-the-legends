const yargs = require("yargs");
const argv = yargs(JSON.parse(process.env.npm_config_argv).original)
    .default("release", false)
    .argv;

if (argv.release) {
    // code here
}