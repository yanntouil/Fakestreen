










/**
 * 
 */
export function Icon({ name, fal = false, fas = false, far = false, fab = false, fad = false, className }) {
    const type = fal ? 'fal' : fas ? 'fas' : far ? 'far' : fab ? 'fab' : fad ? 'fad' : 'fal'
    return (
        <i className={`${className ?? ''} ${type} fa-${name}`} />
    )
}


