export const eurFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
});

export const eurFormatBigInt = (value: bigint) => eurFormatter.format(Number(value) / 100);