import _isEmpty from 'lodash/isEmpty'

export const isBlank = (value) => {
    if (typeof value === 'object' && _isEmpty(value)) {
        return true
    } else if (value==='') {
        return true
    } else {
        return false
    }
}

export const isNumber = (value) => {
    if (Number.isInteger(value)) {
        return true
    } else {
        return false
    }
}
