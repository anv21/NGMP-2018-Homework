import { EventEmitter } from 'events';
import fs from 'fs';
import path from 'path';

export default class DirWatcher extends EventEmitter {

    watch(directoryPath, delay) {
        this.fileList = this.fileList || fs.readdirSync(directoryPath);
        let updatedFileList = fs.readdirSync(directoryPath);

        updatedFileList.forEach(file => {
            if (this.fileList.includes(file) === false) {
                this.emit('dirWatcher: changed', path.join(directoryPath, file));
            }
        });

        this.fileList = updatedFileList;

        setTimeout(() => {
            this.watch(directoryPath, delay);
        }, delay);
    };
}
