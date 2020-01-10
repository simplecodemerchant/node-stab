function zip(head, line){
    const o = {}
    for (let i=0; i<head.length; i++){
        o[head[i]] = line[i]
    }
    return o
}


module.exports = {zip}