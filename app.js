import {DirWatcher} from './modules';
import {Importer} from './modules';

const dirWatcher = new DirWatcher();
dirWatcher.watch('./data', 100);

const importer = new Importer();
dirWatcher.on('dirWatcher: changed', (filePath) => {
    console.log('Sync import: ', importer.importSync(filePath));
    importer.import(filePath).then(
        (content) => {
            console.log('Async import: ', content)
        },
        (err) => {
            console.log(err)
        });
});
