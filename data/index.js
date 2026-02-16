// data/index.js
import { verbsA1 } from "./verbsA1.js";
import { verbsA2 } from "./verbsA2.js";
import { verbsB1 } from "./verbsB1.js";
import { verbsB2 } from "./verbsB2.js";
import { verbsC1 } from "./verbsC1.js";
import { verbsC2 } from "./verbsC2.js";
import { nounsA1 } from "./nounsA1.js";
import { nounsA2 } from "./nounsA2.js";
import { nounsB1 } from "./nounsB1.js";
import { nounsB2 } from "./nounsB2.js";
import { nounsC1 } from "./nounsC1.js";
import { nounsC2 } from "./nounsC2.js";
import { adjectivesA1 } from "./adjectivesA1.js";
import { adjectivesA2 } from "./adjectivesA2.js";
import { adjectivesB1 } from "./adjectivesB1.js";
import { adjectivesB2 } from "./adjectivesB2.js";
import { adjectivesC1 } from "./adjectivesC1.js";
import { adjectivesC2 } from "./adjectivesC2.js";

export const DB = {
  verbs: { A1: verbsA1, A2: verbsA2, B1: verbsB1, B2: verbsB2, C1: verbsC1, C2: verbsC2 },
  nouns: { A1: nounsA1, A2: nounsA2, B1: nounsB1, B2: nounsB2, C1: nounsC1, C2: nounsC2 },
  adjectives: { A1: adjectivesA1, A2: adjectivesA2, B1: adjectivesB1, B2: adjectivesB2, C1: adjectivesC1, C2: adjectivesC2 }
};
