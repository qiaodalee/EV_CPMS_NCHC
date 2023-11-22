const xml2js = require('xml2js');
const fs = require('fs');

const file_path = './src/config/config.xml';
var parser = new xml2js.Parser();

function getXML() {
    const xmlFilePath = './src/config/config.xml';
    return fs.readFileSync(xmlFilePath, 'utf-8');
}

function readFile() {
    let xml_doc = fs.readFileSync(file_path, { encoding: 'utf8' }, (err, data) => {
        if (!!err) return console.error(err.toString());
    });
    parser.parseString(xml_doc, (err, result) => {
        if (!!err) return console.error(err.toString());
        xml_doc = JSON.parse(JSON.stringify(result));
    });
    return xml_doc;
}

function writeFile(xml_doc) {
    const xml = new xml2js.Builder().buildObject(xml_doc);
    fs.writeFile(file_path, xml, (err) => {
        if (err != null) {
            console.log(err);
            return false;
        }
    });
    return true;
}

export default {
    getXML,
    readFile,
    writeFile
};
