import { isEmpty } from 'lodash';

export const transferCapitalize = (str: string)=> {
    if (str.includes('_')) {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    } else if (str.match(/[a-z][A-Z]/)) {
        const words = str.match(/([a-z]+)|([A-Z][a-z]+)/g) as string[]
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export const checkKeyRequired = (obj: Object, keys: string[]) => {
    let res = {}
    const newObj = { ...obj } as any
    for (const key of keys) {
        if (newObj.hasOwnProperty(key) && isEmpty(newObj[key])) {
            return {
                code: 400,
                message: `${transferCapitalize(key)} is required`
            }
        }
    }
    
    return res
}