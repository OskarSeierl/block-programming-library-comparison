export default class Robot {
    name: string;
    stepCounter: number;

    constructor(name: string) {
        this.name = name;
        this.stepCounter = 0;
    }

    print(something: string="Hello"): void {
        console.log(`Robot (${this.name}): ${something}`);
    }

    wallInFront(): boolean {
        return this.stepCounter >= 3;
    }

    go(steps: number): void {
        this.stepCounter += steps;
    }
}
