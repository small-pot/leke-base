const nodePath = require('path');
const fs = require('fs');
const makeDir = require('make-dir');

class resourcePlugin {
    constructor({
        filename = 'resource.json',
        path,
        writeToDisk,
        outputAsset = true,
    } = {}) {
        this.opts = {filename, writeToDisk, outputAsset, path};
        this.compiler = null;
    }

    handleEmit(hookCompiler, callback){
        const stats = hookCompiler.getStats().toJson({
            hash: false,
            publicPath: true,
            assets: false,
            chunks: false,
            modules: false,
            source: false,
            errorDetails: false,
            timings: false,
        });
        const result = JSON.stringify(
            {
                publicPath:stats.publicPath,
                entrypoints:stats.entrypoints,
                namedChunkGroups:stats.namedChunkGroups
            },
            null,
            2
        );

        if (this.opts.outputAsset) {
            hookCompiler.assets[this.opts.filename] = {
                source() {
                    return result;
                },
                size() {
                    return result.length;
                },
            };
        }

        if (this.opts.writeToDisk) {
            this.writeAssetsFile(result);
        }

        callback();
    }

    writeAssetsFile(manifest){
        const outputFolder =
            this.opts.writeToDisk.filename || this.compiler.options.output.path;

        const outputFile = nodePath.resolve(outputFolder, this.opts.filename);

        try {
            if (!fs.existsSync(outputFolder)) {
                makeDir.sync(outputFolder);
            }
        } catch (err) {
            if (err.code !== 'EEXIST') {
                throw err;
            }
        }

        fs.writeFileSync(outputFile, manifest);
    }

    apply(compiler) {
        this.compiler = compiler;
        compiler.options.output.jsonpFunction = 'webpackSSR';
        if (this.opts.outputAsset || this.opts.writeToDisk) {
            compiler.hooks.emit.tapAsync('manifest-plugin', this.handleEmit.bind(this));
        }
    }
}

module.exports=resourcePlugin;
