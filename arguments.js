'use strict'

const ArgumentParser = require('argparse').ArgumentParser


module.exports = () => {

    const parser = new ArgumentParser({
        version: '0.0.1',
        addHelp: false,
        description: 'Argparse example'
    })

    parser.addArgument([ '-s', '--show-headers' ],
        {
            help: 'Show column headers',
            action: 'storeTrue'
        }
    )

    parser.addArgument([ '-h' ],
        {
            help: 'Headers to output',
            action: 'store',
            dest: 'output_headers',
            defaultValue: ''
        }
    )

    parser.addArgument([ '-^h' ],
        {
            help: 'Headers to remove from output',
            action: 'store',
            dest: 'remove_headers',
            defaultValue: ''
        }
    )

    parser.addArgument([ '-d', '--delimiter' ],
        {
            help: 'Delimiter (default: \\t)',
            defaultValue: '\t'
        }
    )

    parser.addArgument([ '-c' ],
        {
            help: 'Search values',
            action: 'append',
            nargs: '+',
            dest: 'user_searches',
            defaultValue: []
        }
    )

    parser.addArgument([ 'file' ],
        {
            help: 'Delimited File'
        }
    )

    const p = parser.parseArgs()

    p.user_searches = p.user_searches.map(search => search[0])
    p.output_headers = p.output_headers.split(/\s*,\s*/).filter(v => v !== '')
    p.remove_headers = p.remove_headers.split(/\s*,\s*/).filter(v => v !== '')

    return p
}

