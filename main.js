#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const args = require('./arguments')()
const { zip, determine_headers } = require('./helpers')

function main(){
    const {
        file,
        delimiter,
        show_headers,
        user_searches,
        output_headers,
        remove_headers
    } = require('./arguments')()

    const searches = require('./searches')(user_searches)

    const headers = []
    const headers_to_output = []
    
    const rl = readline.createInterface({
        input: fs.createReadStream(path.resolve('.', file)),
        crlfDelay: Infinity
    })

    rl.on('line', line => {
        const l = line.split(delimiter)

        // Headers
        if (headers.length === 0){

            if (show_headers){

                l.forEach((v,i) => console.log(`${i}. ${v}`) )

                process.exit(1)
            }
            headers_to_output.push(...determine_headers(l, output_headers, remove_headers))

            console.log(headers_to_output.join(delimiter))
            headers.push(...l)
            return
        }

        // Test if line data matches the user search
        const ldict = zip(headers, l)
        if (searches.test(ldict)){

            console.log(
                headers_to_output.map(col => ldict[col]).join(args.delimiter)
            )

        }

    })

    // rl.on('close', () => {
    //     const used = process.memoryUsage().heapUsed / 1024 / 1024
    //     console.log(
    //     `The script uses approximately ${Math.round(used * 100) / 100} MB`
    //     )
    // })
}

main()
