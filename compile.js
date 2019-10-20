const fsPromises = require('fs').promises;
const ClosureCompiler = require('google-closure-compiler').jsCompiler;

(async function () {
    const compiler = new ClosureCompiler({ jscomp_off: "*" });

    const inputJs = await fsPromises.readFile('closure-note.js');

    const result = await new Promise(resolve => {
        compiler.run([{ src: inputJs.toString() }], (exitCode, stdOut, stdErr) => {
            resolve(
                JSON.stringify({
                    exitCode: exitCode,
                    stdOut: stdOut,
                    stdErr: stdErr
                }, undefined, 2)
            );
        });
    });

    await fsPromises.writeFile('result.json', result || '');
}());