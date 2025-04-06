import { isValidCreditCard } from "./creditCard";

test("the credit card number is 4580238456893475", () => {

    const creditNumber = isValidCreditCard("4580238456893475");

    expect(creditNumber).toBe(true);
});