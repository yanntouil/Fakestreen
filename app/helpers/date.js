import { zeroPad } from "."




/**
 * Checks if date is a Date
 * @param {any} date 
 * @returns {Boolean}
 */
export const isDate = date => (Object.prototype.toString.call(date) === '[object Date]') && (date && !Number.isNaN(date.valueOf()))


/**
 * Checks if two date values are of the same month and year
 * @param {Date} date 
 * @param {Date} basedate 
 * @returns {Boolean}
 */
export const isSameMonth = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false
    const basedateMonth = +(basedate.getMonth()) + 1
    const basedateYear = basedate.getFullYear()
    const dateMonth = +(date.getMonth()) + 1
    const dateYear = date.getFullYear()
    return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear)
}

/**
 * Checks if two date are the same day (day, month, year)
 * @param {Date} date 
 * @param {Date} basedate
 * @returns {Boolean}
 */
 export const isSameDay = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false
    const basedateDate = basedate.getDate()
    const basedateMonth = +(basedate.getMonth()) + 1
    const basedateYear = basedate.getFullYear()
    const dateDate = date.getDate()
    const dateMonth = +(date.getMonth()) + 1
    const dateYear = date.getFullYear()
    return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear)
}

/**
 * Checks if two date are the same day (day, month, year)
 * @param {Date} date 
 * @param {Date} basedate
 * @returns {Boolean}
 */
export const isBeforeDay = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false
    const basedateDate = basedate.getDate()
    const basedateMonth = +(basedate.getMonth()) + 1
    const basedateYear = basedate.getFullYear()
    const dateDate = date.getDate()
    const dateMonth = +(date.getMonth()) + 1
    const dateYear = date.getFullYear()
    return +`${dateYear}${zeroPad(dateMonth)}${zeroPad(dateDate)}` < +`${basedateYear}${zeroPad(basedateMonth)}${zeroPad(basedateDate)}`
}





