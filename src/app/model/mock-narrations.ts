import { Narration, Section } from './narration-model';

let mockNarrations: Narration[] = [];

let n1: Narration = new Narration("a127fec", "How to Negotiate");

n1.addSection(new Section("Set The Tone", "First, you have to set the tone from the start.", 5));
n1.addSection(new Section("Know What You Want", "Next, you need to identify what your goals are.", 10));
n1.addSection(new Section("Be Willing To Walk", "Always be ready to walk away from the negotiation.", 5));

let n2: Narration = new Narration("90b112cf", "Self-Employment Taxes: What you need to know");
n2.addSection(new Section("Overview", "First, let's discuss the situation we're in and why we have to pay our taxes early as opposed to the end of the year", 15));
n2.addSection(new Section("The Dates", "We'll need to pay quarterly on these dates for 2018:...", 5));

mockNarrations.push(n1, n2);

export { mockNarrations }
