const fs = require('fs');
const path = require('path');

const Logger = (exports.Logger = {});
const logStreams = [];
const logLevels = [
    {
        name: "fatal",
        value: 50000
    },
    {
        name: "error",
        value: 40000
    },
    {
        name: "warn",
        value: 30000
    },
    {
        name: "info",
        value: 20000
    },
    {
        name: "debug",
        value: 10000
    }
];

const logPath = path.resolve(path.join(__dirname, '../logs'));

if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

logStreams.push({
    name: "combined",
    stream: fs.createWriteStream(
        path.resolve(path.join(logPath, 'combined.log')), { encoding: 'utf-8' }
    )
});

logLevels.forEach((level) => {
    logStreams.push({
        name: level.name,
        stream: fs.createWriteStream(
            path.resolve(path.join(logPath, level.name + ".log")), { encoding: 'utf-8' }
        )
    });
});

Logger.info = function(msg) {
    const message = new Date().toISOString() + " : " + msg + "\n";
    getCombinedStream().write("[INFO] " + message);
    getStream('info').write(message);
};

Logger.error = function(msg) {
    const message = new Date().toISOString() + " : " + msg + "\n";
    getCombinedStream().write("[ERROR] " + message);
    getStream('error').write(message);
};

Logger.warn = function(msg) {
    const message = new Date().toISOString() + " : " + msg + "\n";
    getCombinedStream().write("[WARN] " + message);
    getStream('warn').write(message);
};

const getCombinedStream = () => {
    return logStreams.find(ls => ls.name == "combined").stream;
};

const getStream = (streamName) => {
    return logStreams.find(ls => ls.name == streamName).stream;
};
