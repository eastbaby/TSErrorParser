'use strict';

import { parseError } from "../src/index";
import { assert } from 'chai';

describe('test/index.ts', () => {
    it('success case1', () => {
        const myError: Error = {
            name: 'demo',
            message: 'Error raised',
            stack: `TypeError: Error raised
            at bar http://192.168.31.8:8000/c.js:2:9`,
        }
        const result = parseError(myError);
        assert.deepStrictEqual(result, {
            message: 'Error raised',
            stack: [{
                line: 2,
                column: 9,
                filename: 'http://192.168.31.8:8000/c.js'
            }],
        });
    });
    it('success case2', () => {
        const myError: Error = {
            name: 'demo',
            message: 'Error raised',
            stack: `
                bar@http://192.168.31.8:8000/c.js:2:9
                foo@http://192.168.31.8:8000/b.js:4:15
                calc@http://192.168.31.8:8000/a.js:4:3
                <anonymous>:1:11
                http://192.168.31.8:8000/a.js:22:3
            `,
        }
        const result = parseError(myError);
        assert.deepStrictEqual(result, {
            message: 'Error raised',
            stack: [{
                line: 2,
                column: 9,
                filename: 'http://192.168.31.8:8000/c.js'
            }, {
                column: 15,
                filename: 'http://192.168.31.8:8000/b.js',
                line: 4,
            },
            {
                column: 3,
                filename: 'http://192.168.31.8:8000/a.js',
                line: 4,
            },
            {
                column: 3,
                filename: 'http://192.168.31.8:8000/a.js',
                line: 22,
            }],
        });
    });
    it('success case3', () => {
        const myError: Error = {
            name: 'demo',
            message: 'Error raised',
            stack: `TypeError: Error raised
                 at bar http://192.168.31.8:8000/c.js:2:9
                 at foo http://192.168.31.8:8000/b.js:4:15
                 at calc http://192.168.31.8:8000/a.js:4:3
                 at <anonymous>:1:11
                 at http://192.168.31.8:8000/a.js:22:3
               `,
        }
        const result = parseError(myError);
        assert.deepStrictEqual(result, {
            message: 'Error raised',
            stack: [{
                line: 2,
                column: 9,
                filename: 'http://192.168.31.8:8000/c.js'
            }, {
                column: 15,
                filename: 'http://192.168.31.8:8000/b.js',
                line: 4,
            },
            {
                column: 3,
                filename: 'http://192.168.31.8:8000/a.js',
                line: 4,
            },
            {
                column: 3,
                filename: 'http://192.168.31.8:8000/a.js',
                line: 22,
            }],
        });
    });
})
