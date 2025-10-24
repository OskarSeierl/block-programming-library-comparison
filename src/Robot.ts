export default class Robot {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    print(something: string="Hello"): void {
        console.log(`Robot (${this.name}): ${something}`);
    }
}
