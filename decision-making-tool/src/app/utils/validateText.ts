export type parsedData = Array<{ title: string; weight: number }>;

export class ValidateText {
    private readonly regex: RegExp;

    constructor() {
        this.regex = /^(?:"([^"]*?)"|([^",]*?))\s*,\s*(\d+)\s*$/; // разбивка строк на части с пробелами запятыми и кавычками
    }

    public validate(input: string): boolean {
        const lines = input.split('\n');
        for (let line of lines) {
            line = line.trim();
            if (this.regex.test(line)) {
                return true;
            }
        }
        return false;
    }

    public parse(input: string): parsedData {
        const validInput: parsedData = [];
        const lines = input.split('\n');

        for (let line of lines) {
            line = line.trim();
            const result = this.regex.exec(line);
            if (result) {
                const title = result[1] ? result[1] : result[2];
                const weight = parseInt(result[3], 10);
                validInput.push({ title: title.trim(), weight: weight });
            }
        }
        return validInput;
    }

    public getValidateTextArea(textArea: HTMLTextAreaElement): parsedData | void {
        let textAreaInput;
        if (textArea instanceof HTMLTextAreaElement) {
            textAreaInput = textArea.value;
        }
        const validator = new ValidateText();

        if (textAreaInput) {
            if (validator.validate(textAreaInput)) {
                const parsedInput = validator.parse(textAreaInput);
                return parsedInput;
            }
        }
    }
}
