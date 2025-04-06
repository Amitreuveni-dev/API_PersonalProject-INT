import { isLeapYear } from "./dates";

test("The year is 2000", () => {

    const actual = isLeapYear(2000);

    expect(actual).toBeTruthy();
});
test("The year is 13", () => {

    const actual = isLeapYear(13);

    expect(actual).toBeFalsy();
});

const actual = isLeapYear(-2);

test(`The year is ${actual}`, () => {

    expect(actual).toBeFalsy();
});


test(`The year is 2 + 2`, () => {

    const actual = isLeapYear(2 + 2);

    expect(actual).toBeTruthy();
});

test(`The year is -4`, () => {

    const actual = isLeapYear(-4);

    expect(actual).toBeTruthy();
});