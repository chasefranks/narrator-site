/**
 * emitted when narration begins
 */
export class NarrationBegin { }

/**
 * emitted when narration is paused
 */
export class NarrationPause { }

export class SectionBegin {
  constructor( public sectionId: number ) { }
}

export class SectionFinish {
  constructor( public sectionId: number ) { }
}

export class NarrationEnd { }
