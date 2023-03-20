export function ptbrDate(dateStr: any) {
    return dateStr.substring(3,5) + '/' + dateStr.substring(0,2) + '/' + dateStr.substring(6,10);
}

export function isValidDate(dateStr: any) {
    let timestamp = Date.parse(ptbrDate(dateStr));
    return !(isNaN(timestamp));
}

export function isValidTime (time: any) {
    const timeReg = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
    return time.match(timeReg)
}

export function bdNumber(numberStr: any) {
    let novaStr = ''+numberStr;
    if (novaStr) {
        novaStr=novaStr.replace(',', '.');
    }
    return novaStr;
}

export function isNumber(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function removeInvalidStrings(object: any) {
    const keys = Object.keys(object);
    for (const key of keys) {
        const value = object[key];
        if (typeof value === 'string' || value instanceof String) {
            object[key] = cleanString(String(value));
        }
    }
    return object;
}

function cleanString(input: string) {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}
