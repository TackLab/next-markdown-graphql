import * as matter from 'gray-matter';
import find from 'list-files';

export default class MarkdownHelper {

    constructor(directory: string) {
        this.directory = directory;
    }

    #getMarkdownFiles() {
        find(function (result) {
            console.log(result);
        }, {
            dir: this.directory,
            name: 'md'
        });
    }
}
