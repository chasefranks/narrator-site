export class Narration {

    public id: string;

    constructor(
        public name: string,
        public permalink?: string,
        public sections: Section[] = []
    ) { }

    addSection(section: Section) {
        if (!this.sections) {
            this.sections = [];
        }
        section.id = this.sections.length;
        this.sections.push(section);
    }

    getSection(id: number): Section {
        if (!this.sections) {
            return null;
        }
        return this.sections.find(s => s.id === id);
    }

}

export class Section {

    public id;

    constructor(
        public name: string,
        public content: string,
        public duration: number,
        public remaining: number = duration,
        public activeState: string = 'inactive'
    ) { }

}
