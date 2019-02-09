const fs = require('fs');
const path = require('path');
const commander = require('commander');
const through2 = require('through2');
const csvjson = require('csvjson');

const readStream = filePath => fs.createReadStream(filePath);

function reverse() {
    process.stdin.on('data', (data) => {
        process.stdout.write(data.toString().split('').reverse().join(''));
    });
}

function transform() {
    process.stdin.on('data', (data) => {
        process.stdout.write(data.toString().toUpperCase());
    });
}

function outputFile(path) {
    if (!path) {
        throw new Error('File should be defined')
    }

    readStream(path)
        .on('error', error => console.error(error))
        .pipe(process.stdout);
}

function convertFromFile(path) {
    if (!path) {
        throw new Error('File should be defined')
    }

    const toObject = csvjson.stream.toObject();
    const stringify = csvjson.stream.stringify();

    readStream(path)
        .on('error', error => console.error(error))
        .pipe(toObject)
        .pipe(stringify)
        .pipe(process.stdout);
}

function convertToFile(path) {
    if (!path) {
        throw new Error('File path should be defined')
    }

    const toObject = csvjson.stream.toObject();
    const stringify = csvjson.stream.stringify();
    const writeStream = fs.createWriteStream(path.replace(/\.[^\.]+$/, '.json'));

    readStream(path)
        .on('error', error => console.error(error))
        .pipe(toObject)
        .pipe(stringify)
        .pipe(writeStream);
}


function cssBundler(directoryPath) {
    if (!directoryPath) {
        throw new Error('Directory path should be defined')
    }

    const writeStream = fs.createWriteStream(`${directoryPath}/bundle.css`);

    fs.readdir(directoryPath, (error, files) => {
        if (error) {
            console.error(error);
        }

        files.forEach((file) => {
            if (path.extname(file) === '.css') {
                fs.createReadStream(`${directoryPath}/${file}`)
                    .on('data', (data) => {
                        writeStream.write(`\n${data.toString()}`);
                    });
            }
        });

    });
}

function helpMessage() {
    console.log(`Options:
        -a, --action [actionName]
        -f, --file [filePath]
        -p, --path [dirPath]
        -h, --help`);
    console.log("=================================");
    console.log(`Available actions:
        reverse
        transform
        outputFile
        convertFromFile
        convertToFile
        cssBundler`);

    process.exit();
}

commander
    .option('-a, --action [actionName]', 'action name')
    .option('-f, --file [filePath]', 'file path')
    .option('-h, --help []', 'custom helper')
    .option('-p, --path [dirPath]', 'directory path')
    .parse(process.argv);

if (commander.rawArgs.length <= 2 ||
    commander.rawArgs[2] === '--help' || commander.rawArgs[2] === '-h'
) {
    helpMessage();
}

if (commander.action) {
    switch (commander.action) {
        case 'reverse':
            reverse();
            break;
        case 'transform':
            transform();
            break;
        case 'outputFile':
            outputFile(commander.file);
            break;
        case 'convertFromFile':
            convertFromFile(commander.file);
            break;
        case 'convertToFile':
            convertToFile(commander.file);
            break;
        case 'cssBundler':
            cssBundler(commander.path);
            break;
        default:
            helpMessage();
    }
}