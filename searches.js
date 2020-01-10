const valid_op = '== === != !== ^ $'.split(' ')

function check(lv, sv, op){
    switch (op){
        case ('=='):  { return lv == sv }
        case ('==='): { return lv === sv }
        case ('!='):  { return lv != sv }
        case ('!=='): { return lv !== sv }
        case ('^'):   { return lv.startsWith(sv)}
        case ('$'):   { return lv.endsWith(sv)}

        default: {
            return false
        }
    }
}

function Searches(search_arg){
    const o = {}
    o.searches = null

    o.test = function(line){
        return this.searches.map(search => {

            return search.map(s => {

                if (check(line[s.col], s.val, s.op)){
                    return true
                }

                return false
            })

            .every(el => el === true)
        })
        .some(el => el === true)
    }

    o.setup = function(s_arg){
        this.searches = s_arg.map(search => {
            return search.split(/(?<!\\),/).map(s => {
                s = s.split(/(?<!\\)\|/)

                const op = s.length === 3 ? s[2] : '==';

                if (valid_op.indexOf(op) === -1){
                    console.error(`"${op}" is not a valid operator! Use one of ${valid_op}`)
                    process.exit(1)
                }

                return {
                    col: s[0],
                    val: s[1],
                    op
                }
            })
        })
    }


    o.setup(search_arg)
    return o
}


module.exports = Searches