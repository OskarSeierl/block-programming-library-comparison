export default class Robot {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    print(): void {
        console.log(`Robot: ${this.name}`);
    }
}
