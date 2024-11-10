export function formatDateByTimezone(timezone) {
    const date = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    };

    return new Intl.DateTimeFormat('en-GB', { ...options, timeZone: timezone }).format(date);
}
