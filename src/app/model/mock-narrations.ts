import { Narration, Section } from './narration-model';

let mockNarrations: Narration[] = [];

let n1: Narration = new Narration();
n1.id = "a127fec";
n1.name = "How to Negotiate";
n1.permalink = "how-to-negotiate";
n1.addSection(new Section());
n1.addSection(new Section());
n1.addSection(new Section());

n1.sections[0].name = "Set The Tone";
n1.sections[0].content = "First, you have to set the tone from the start.";
n1.sections[0].duration = 5;

n1.sections[1].name = "Know What You Want";
n1.sections[1].content = "Next, you need to identify what your goals are.";
n1.sections[1].duration = 10;

n1.sections[2].name = "Be Willing To Walk";
n1.sections[2].content = "Always be ready to walk away from the negotiation...";
n1.sections[2].duration = 5;

let n2: Narration = new Narration();
n2.id = "90b112cf";
n2.name = "Self-Employment Taxes: Just the Essentials";

n2.addSection(new Section());
n2.addSection(new Section());

n2.sections[0].name = "The Basics";
n2.sections[0].content = "Self Employment taxes are filed with the form 1040 ES, every quarter."
n2.sections[0].duration = 10;

n2.sections[1].name = "Filing Quarterly";
n2.sections[1].content = "The dates you will need to file on are...";
n2.sections[1].duration = 5;

mockNarrations.push(n1, n2);

export { mockNarrations }
