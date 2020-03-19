interface StackMatchResult extends RegExpMatchArray {
    groups?: any
}

export interface ErrorMessage {
    message: string
    stack: {
        line: number
        column: number
        filename: string
    }[]
}

export function parseError(err: Error): ErrorMessage {
    // implement
    const stackArr: string[] = err.stack ? err.stack.match(/(?<=[@\s])(https?:\/\/\S+:(\d)+:(\d)+)/g) || [] : []
    const stack = stackArr.map(item => {
        const matchRes: StackMatchResult | null = item.match(/(?<filename>https?:\/\/\S+):(?<line>\d+):(?<column>\d+)/)
        const groups = (matchRes && matchRes.groups) || {}
        return {
            line: Number(groups.line),
            column: Number(groups.column),
            filename: groups.filename,
        }
    })
    return {
        message: err.message,
        stack,
    }
}
