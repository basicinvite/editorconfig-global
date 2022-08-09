const fs = require('fs'),
    chalk = require('chalk');
const copyFile = require('cp-file');

const Writer = {

    sourcePath: '',
    targetPath: '',
    _writeFile: true,

    run: function() {
        this.displayPlan();
        this.checkForFile();
        this.writeToFile();
    },

    displayPlan: function() {
        console.log(chalk.cyan(`Source: ${this.sourcePath}`));
        console.log(chalk.cyan(`Target:  ${this.targetPath}`));
    },

    checkForFile: function() {
        // If for some reason the source path is not found, we won't write the file
        if (!fs.existsSync(this.sourcePath)){
            this._writeFile = false;
        }
    },

    writeToFile: function() {

        if (this._writeFile) { 
            try {

                // Write file
                copyFile.overwrite = true;
                copyFile.sync(this.sourcePath, this.targetPath);

                // Output successful message
                console.info(chalk.green(` ✓ successfully added .editorconfig file at ${this.targetPath}`));
            } catch (e) {
                this.displayException(e);
                
            }
        }
    },

    displayException(e) {
        // Output reason for failure
        console.error(
            `\n ✗ Unable to write .editorconfig file at ${this.targetPath}
            \n
            \n Error:`
        );
        setTimeout(function () {
            console.error(chalk.red(e));
            console.log('');
        }, 500);
    }
};

module.exports = Writer;