export const eurFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
});

export const eurNoCentsFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
});

export const eurFormatBigInt = (value: bigint) => eurFormatter.format(Number(value) / 100);

export const eurNoCentsFormatBigInt = (value: bigint) => eurNoCentsFormatter.format(Number(value) / 100);