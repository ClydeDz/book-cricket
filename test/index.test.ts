import { Calculator } from "../src/javascript/index";

describe("index / run", function ():void {
    test("should succeed with simple inputs", function ():void {
        let c: any = new Calculator();
        let addResult: any = c.add();
        expect(addResult).toEqual(7);
    });
});