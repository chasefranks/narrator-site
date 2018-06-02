/** define our narration data model */
class Narration {
  id: string;
  name: string;
  sections: Section[] = [];
  permalink: string;

  addSection(section: Section) {
    section.id = this.sections.length;
    this.sections.push(section);
  }

}

class Section {
  id: number;
  name: string;
  content: string;
  duration: number;
  remaining: number;
  activeState: string = 'inactive';
}

export {Narration, Section};
