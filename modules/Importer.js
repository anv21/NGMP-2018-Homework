import * as fs from 'fs';
import csvjson from 'csvjson';

const options = {delimiter: ','};

export default class Importer {

    import(filePath) {
        return new Promise((reject, resolve) => {

            fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
                if (data) {
                    resolve(csvjson.toObject(data, options));
                } else {
                    reject(err);
                }
            });
        });
    };

    importSync(filePath) {
        let csv = fs.readFileSync(filePath, {encoding: 'utf-8'}, (err) => {
            console.error(err);
        });
        return csvjson.toObject(csv, options);
    };
}
