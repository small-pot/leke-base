const path = require('path');
const mkdirp = require('mkdirp')

class resourcePlugin {
    constructor(filename='resource.json') {
        this.filename=filename
        this.compiler = null;
    }

    handleEmit(hookCompiler, callback){
        const stats = hookCompiler.getStats().toJson();
        const result = JSON.stringify(
            {
                publicPath:stats.publicPath,
                namedChunkGroups:stats.namedChunkGroups
            },
            null,
            2
        );

        this.writeAssetsFile(result);

        callback();
    }

    writeAssetsFile(json){
        const outputDir=this.compiler.outputPath
        const fs=this.compiler.outputFileSystem
        const outputFile = path.resolve(outputDir, this.filename);
        try {
            if (!fs.existsSync(outputDir)) {
                if(fs.mkdirpSync){
                    fs.mkdirpSync(outputDir);
                }else{
                    mkdirp.sync(outputDir);
                }
            }
        } catch (err) {
            if (err.code !== 'EEXIST') {
                throw err;
            }
        }

        fs.writeFileSync(outputFile, json);
    }

    apply(compiler) {
        this.compiler = compiler;
        compiler.hooks.emit.tapAsync('resource-plugin', this.handleEmit.bind(this));
    }
}

module.exports=resourcePlugin;
