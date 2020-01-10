function zip(head, line){
    const o = {}
    for (let i=0; i<head.length; i++){
        o[head[i]] = line[i]
    }
    return o
}

function determine_headers(h, g, r){
    if (g.length === 0 && r.length === 0){
        return h
    }

    if (g.length > 0 && r.length > 0){
        console.error('Cannot use -h and -r together!')
        process.exit(1)
    }

    if (g.length > 0){
        return h.filter(col => g.indexOf(col) !== -1)
    }

    if (r.length > 0){
        return h.filter(col => r.indexOf(col) === -1)
    }
}

module.exports = {zip, determine_headers}