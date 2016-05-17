var BLOCKNAMES = ['pre-exercise-code', 'sample-code', 'solution', 'sct'];
var SPEC = require('./sct_rules.json');

function createExerciseHtml(code, specs, dstEl){
    if (specs) code['sct'] = code['sct'].concat('\n', specs.map(parseSpec).join('\n'));

    var div = document.createElement('div');
    div.setAttribute('data-datacamp-exercise', "");
    for (let k of BLOCKNAMES) 
        div.appendChild(makeHtmlCode(k, code[k]));
    
    if (dstEl) dstEl.appendChild(div);
    console.log(div.cloneNode(true));
    return div
}

function makeHtmlCode(name, inner){
    var el = document.createElement('code');
    el.innerHTML = inner;
    el.setAttribute("data-type", name);
    return el
}

function createSpec(name){
    return JSON.parse(JSON.stringify(SPEC[name]));

}

function parseSpec([name, ...args]){
    var expanded = args.map( (arg) => {
        // recurse for a list of expressions
        if (Array.isArray(arg.content)) {
            var sigs = arg.content.map(parseSpec);
            // join into single expression
            return `{ ${sigs.join('; ')} }`
        }
        
        if (arg.content === "") arg.content = arg.default;

        if (arg.content === "" || arg.content == undefined)
            throw `entry: ${name} arg '${arg.name}' has no content or default`;

        console.log(`spec: ${arg.content}`)
        return arg.content
    });
    console.log(`expanded: ${expanded}`);
    // return call signature
    return `${name}(${expanded.join(', ')})`;

}

function htmlToObj(el){
    var blocks = ['pre-exercise-code', 'sample-code', 'solution', 'sct', 'hint'],
        output = {}
    
    blocks.forEach( (v) => 
        output[v] = el.querySelector(`[data-type = ${v}]`).innerHTML
    );

    return output
}
    
module.exports = {
    createExerciseHtml,
    makeHtmlCode,
    createSpec,
    parseSpec,
    htmlToObj,
    BLOCKNAMES,
    SPEC
}
