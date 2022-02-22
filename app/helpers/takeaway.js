import { isBeforeDay, isDate, isSameDay, zeroPad } from "."


const takeawayTimeSlot = [// Send to api
    {// Sunday
        lunch: [1000, 1600],
    },
    {// Monday
        lunch: [1200, 1400],
        dinner: [1800, 2200],
    },
    {// Tuesday
        lunch: [1200, 1400],
        dinner: [1800, 2200],
    },
    {// Wednesday
        lunch: [1200, 1400],
        dinner: [1800, 2200],
    },
    {// Thursday
        lunch: [1200, 1400],
        dinner: [1800, 2200],
    },
    {// Friday
        lunch: [1200, 1400],
        dinner: [1800, 2400],
    },
    {// Saturday
        lunch: [1200, 1400],
        dinner: [1800, 2400],
    },
]

const takewayServiceTimeStep = 15// move to config




/**
 * takewayTimeRange
 * @param {{date: String, service: {string}}} params
 * @returns {Array}
 */
export const takewayServiceTimeRange = (params) => {
    const date = new Date(params.date)
    const now = new Date()
    const service = params.service ?? takewayNextServiceAvailable(params.date)
    if (!isDate(date) ||// invalid date, past date or no service available on this day
        isBeforeDay(date, now) ||
        !(takeawayTimeSlot[date.getDay()] && takeawayTimeSlot[date.getDay()][service])
    ) return [0, 0]

    const timeRange = takeawayTimeSlot[date.getDay()][service]
    if (isSameDay(date, now)) {// Today
        const coeff = 1000 * 60 * takewayServiceTimeStep
        const rounded = new Date(Math.round(now.getTime() / coeff) * coeff)// Date rounded on next Step
        const time = +(rounded.getHours() + zeroPad(rounded.getMinutes() / 60 * 100))// Format date to time
        if (timeRange[0] < time) return [time, timeRange[1]]// min now max service max
    }
    return timeRange// Future date
}

/**
 * Return an array of service available
 * @return {Array} 
 */
export const takewayServicesAvailable = (params) => {
    const date = new Date(params.date)
    const now = new Date()
    if (!isDate(date) ||// invalid date, past date or no service available on this day
        isBeforeDay(date, now) ||
        !takeawayTimeSlot[date.getDay()]
    ) return []
    if (isSameDay(date, now)) {// Today
        const time = now.getHours() + zeroPad(now.getMinutes())
        const available = []
        Object.keys(takeawayTimeSlot[date.getDay()]).forEach(service => {
            if (time < takeawayTimeSlot[date.getDay()][service][1]) available.push(service)// Add available services
        })
        return available
    }
    return Object.keys(takeawayTimeSlot[date.getDay()])// Future date
}

/**
 * Return next service avalable
 * @param {Date}  date
 * @return {String} 
 */
export const takewayNextServiceAvailable = (date = new Date()) => {
    const services = takewayServicesAvailable({ date })
    return (services.length > 0) ? services[0] : ''
}