export function formatPrice(price) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
}

import moment from 'moment';
export function formatTime(time) {
    return moment(time).format('HH:mm DD/MM/YYYY');
}
