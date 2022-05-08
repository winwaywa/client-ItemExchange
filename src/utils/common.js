export function formatPrice(price) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
}
