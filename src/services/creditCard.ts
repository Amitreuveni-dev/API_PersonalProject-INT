export function isValidCreditCard(creditNumber: string) {

    if (creditNumber.length !== 16) {
        return false;
    }

    return true;
}