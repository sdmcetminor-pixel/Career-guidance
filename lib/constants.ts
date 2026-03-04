// Constants and types for 10th Pass assessment
export const TOTAL_TIME_SECONDS: number = 60 * 60; // 1 hour (60 minutes)

// --- INTERFACES ---
export interface IAptitudeQuestion {
    id: string;
    section: 'Numerical' | 'Verbal' | 'Abstract';
    text: string;
    answerIndex: number; // Index of the correct option in APTITUDE_OPTIONS
}

export interface IProfileQuestion {
    id: string;
    type: string; // e.g., 'Realistic', 'Openness'
    factor: 'RIASEC' | 'OCEAN';
    text: string;
    isReversed: boolean; // True if the question is reverse-scored
    scale: 'Interest' | 'Agreement';
}

export interface IScoreBreakdown {
    [key: string]: number; // e.g., 'Numerical': 85
}

export interface IFinalRecommendation {
    name: string;
    confidence: number;
    flexibility: number;
    aptitudeBreakdown: IScoreBreakdown;
    profileBreakdown: IScoreBreakdown;
    timeExpired: boolean;
}

// --- A. APTITUDE QUESTIONS (24 QUESTIONS: 8 per section) ---
export const APTITUDE_QUESTIONS: IAptitudeQuestion[] = [
    // Numerical (24 Qs)

{ id: 'N1', section: 'Numerical', text: 'Find the next number in the series: 5, 11, 23, 47, ?', answerIndex: 1 }, // 95
{ id: 'N2', section: 'Numerical', text: 'If the sum of first n natural numbers is 210, find n.', answerIndex: 2 }, // 20
{ id: 'N3', section: 'Numerical', text: 'A shopkeeper marks an article 25% above cost price and allows a discount of 10%. Find the profit percent.', answerIndex: 1 }, // 12.5%
{ id: 'N4', section: 'Numerical', text: 'The ratio of incomes of A and B is 4:5 and their expenses are in the ratio 3:4. If A saves ₹500, find B’s savings.', answerIndex: 3 }, // 1000
{ id: 'N5', section: 'Numerical', text: 'Find the simple interest on ₹2400 at 7.5% per annum for 2 years.', answerIndex: 2 }, // 360
{ id: 'N6', section: 'Numerical', text: 'A train travels at 60 km/h and covers a distance in 2 hours. How much distance will it cover in 30 minutes?', answerIndex: 0 }, // 30
{ id: 'N7', section: 'Numerical', text: 'The average of 10 numbers is 15. If one number is excluded, the average becomes 14. Find the excluded number.', answerIndex: 3 }, // 24
{ id: 'N8', section: 'Numerical', text: 'Solve: 3x − 7 = 11', answerIndex: 1 }, // 6
{ id: 'N9', section: 'Numerical', text: 'Find the value of (√144 + √81).', answerIndex: 2 }, // 21
{ id: 'N10', section: 'Numerical', text: 'If the perimeter of a rectangle is 60 cm and its length is 18 cm, find its breadth.', answerIndex: 1 }, // 12

{ id: 'N11', section: 'Numerical', text: 'Find the HCF of 48 and 72.', answerIndex: 2 }, // 24
{ id: 'N12', section: 'Numerical', text: 'A cyclist covers 45 km in 3 hours. How much distance will he cover in 5 hours at the same speed?', answerIndex: 3 }, // 75
{ id: 'N13', section: 'Numerical', text: 'What percentage is 45 out of 180?', answerIndex: 0 }, // 25%
{ id: 'N14', section: 'Numerical', text: 'An article is sold at a loss of 10% for ₹900. Find the cost price.', answerIndex: 2 }, // 1000
{ id: 'N15', section: 'Numerical', text: 'Solve: x/3 + 4 = 10', answerIndex: 1 }, // 18
{ id: 'N16', section: 'Numerical', text: 'Find the value of 2³ × 3².', answerIndex: 0 }, // 72
{ id: 'N17', section: 'Numerical', text: 'The sum of two numbers is 72 and their ratio is 5:7. Find the larger number.', answerIndex: 3 }, // 42
{ id: 'N18', section: 'Numerical', text: 'Convert 0.375 into a fraction in simplest form.', answerIndex: 1 }, // 3/8
{ id: 'N19', section: 'Numerical', text: 'If a worker earns ₹720 for 12 hours of work, how much will he earn for 9 hours?', answerIndex: 0 }, // 540
{ id: 'N20', section: 'Numerical', text: 'Find the area of a circle of radius 7 cm. (π = 22/7)', answerIndex: 2 }, // 154

{ id: 'N21', section: 'Numerical', text: 'Find the LCM of 12, 18 and 24.', answerIndex: 1 }, // 72
{ id: 'N22', section: 'Numerical', text: 'If (x − 3)(x + 5) = 0, find the positive value of x.', answerIndex: 3 }, // 3
{ id: 'N23', section: 'Numerical', text: 'Find the value of: (5² − 3²).', answerIndex: 2 }, // 16
{ id: 'N24', section: 'Numerical', text: 'What is the smallest number divisible by 6, 8 and 12?', answerIndex: 0 }, // 24

// VERBAL APTITUDE – QUESTION POOL (24)

{ id: 'V1', section: 'Verbal', text: 'Choose the synonym of the word "ABUNDANT".', answerIndex: 1 }, // Plentiful
{ id: 'V2', section: 'Verbal', text: 'Choose the antonym of the word "CAUTIOUS".', answerIndex: 2 }, // Reckless
{ id: 'V3', section: 'Verbal', text: 'Book is to Reading as Fork is to ?', answerIndex: 0 }, // Eating
{ id: 'V4', section: 'Verbal', text: 'Find the odd one out: Apple, Banana, Carrot, Mango.', answerIndex: 2 }, // Carrot
{ id: 'V5', section: 'Verbal', text: 'Choose the correct meaning of the idiom: "Once in a blue moon".', answerIndex: 1 }, // Rarely
{ id: 'V6', section: 'Verbal', text: 'Choose the word that best completes the sentence: He is known for his _____ honesty.', answerIndex: 0 }, // Absolute
{ id: 'V7', section: 'Verbal', text: 'Choose the synonym of the word "METICULOUS".', answerIndex: 3 }, // Careful
{ id: 'V8', section: 'Verbal', text: 'Choose the antonym of "EXPAND".', answerIndex: 1 }, // Contract

{ id: 'V9', section: 'Verbal', text: 'Dog is to Bark as Cat is to ?', answerIndex: 2 }, // Meow
{ id: 'V10', section: 'Verbal', text: 'Choose the correctly spelt word.', answerIndex: 0 }, // Necessary
{ id: 'V11', section: 'Verbal', text: 'Find the odd word: Pen, Pencil, Eraser, Book.', answerIndex: 3 }, // Book
{ id: 'V12', section: 'Verbal', text: 'Choose the word opposite in meaning to "BRIEF".', answerIndex: 2 }, // Lengthy
{ id: 'V13', section: 'Verbal', text: 'Choose the synonym of "FRAGILE".', answerIndex: 1 }, // Delicate
{ id: 'V14', section: 'Verbal', text: 'Arrange the words in alphabetical order: Chair, Table, Bed, Almirah.', answerIndex: 3 }, // Almirah, Bed, Chair, Table
{ id: 'V15', section: 'Verbal', text: 'Choose the correct word: She _____ to school every day.', answerIndex: 0 }, // goes
{ id: 'V16', section: 'Verbal', text: 'Choose the antonym of "GENERATE".', answerIndex: 1 }, // Destroy

{ id: 'V17', section: 'Verbal', text: 'What is the meaning of the word "TRANSPARENT"?', answerIndex: 2 }, // See-through
{ id: 'V18', section: 'Verbal', text: 'Find the odd one: Triangle, Square, Rectangle, Circle.', answerIndex: 3 }, // Circle
{ id: 'V19', section: 'Verbal', text: 'Choose the synonym of "HASTY".', answerIndex: 0 }, // Quick
{ id: 'V20', section: 'Verbal', text: 'Choose the antonym of "ANCIENT".', answerIndex: 1 }, // Modern
{ id: 'V21', section: 'Verbal', text: 'Finger is to Hand as Toe is to ?', answerIndex: 2 }, // Foot
{ id: 'V22', section: 'Verbal', text: 'Choose the word nearest in meaning to "OBSERVE".', answerIndex: 3 }, // Watch
{ id: 'V23', section: 'Verbal', text: 'Choose the correctly spelt word.', answerIndex: 1 }, // Separate
{ id: 'V24', section: 'Verbal', text: 'Choose the antonym of "VICTORY".', answerIndex: 0 }, // Defeat

// ABSTRACT APTITUDE – QUESTION POOL (24)

{ id: 'A1', section: 'Abstract', text: 'Find the next number in the series: 2, 4, 8, 16, ?', answerIndex: 1 }, // 32
{ id: 'A2', section: 'Abstract', text: 'Which figure completes the pattern: ▲, ■, ▲, ■, ?', answerIndex: 0 }, // ▲
{ id: 'A3', section: 'Abstract', text: 'Find the odd number: 3, 5, 7, 9, 11.', answerIndex: 3 }, // 9
{ id: 'A4', section: 'Abstract', text: 'If NORTH is written as HTRON, how is SOUTH written?', answerIndex: 2 }, // HTUOS
{ id: 'A5', section: 'Abstract', text: 'Which number comes next: 1, 4, 9, 16, ?', answerIndex: 1 }, // 25
{ id: 'A6', section: 'Abstract', text: 'Find the odd shape: Circle, Square, Triangle, Cube.', answerIndex: 3 }, // Cube
{ id: 'A7', section: 'Abstract', text: 'Find the missing number: 5, 10, 20, ?, 80.', answerIndex: 2 }, // 40
{ id: 'A8', section: 'Abstract', text: 'If CAT = 3, DOG = 3, then ELEPHANT = ?', answerIndex: 1 }, // 8

{ id: 'A9', section: 'Abstract', text: 'Find the next letter in the series: A, C, E, G, ?', answerIndex: 0 }, // I
{ id: 'A10', section: 'Abstract', text: 'Which number does not belong: 2, 4, 8, 10, 16?', answerIndex: 3 }, // 10
{ id: 'A11', section: 'Abstract', text: 'If 1 = 3, 2 = 5, 3 = 7, then 4 = ?', answerIndex: 2 }, // 9
{ id: 'A12', section: 'Abstract', text: 'Find the odd one: Car, Bus, Train, Tree.', answerIndex: 3 }, // Tree
{ id: 'A13', section: 'Abstract', text: 'Which comes next: Z, X, V, T, ?', answerIndex: 1 }, // R
{ id: 'A14', section: 'Abstract', text: 'Find the missing number: 7, 14, 28, ?, 112.', answerIndex: 0 }, // 56
{ id: 'A15', section: 'Abstract', text: 'Which word does not belong: Red, Blue, Green, Circle?', answerIndex: 3 }, // Circle
{ id: 'A16', section: 'Abstract', text: 'Find the next number: 100, 90, 80, 70, ?', answerIndex: 2 }, // 60

{ id: 'A17', section: 'Abstract', text: 'If Monday is coded as MON, how is Tuesday coded?', answerIndex: 0 }, // TUE
{ id: 'A18', section: 'Abstract', text: 'Which number is missing: 1, 1, 2, 3, 5, ?', answerIndex: 1 }, // 8
{ id: 'A19', section: 'Abstract', text: 'Find the odd number: 121, 144, 169, 196, 225.', answerIndex: 0 }, // 121
{ id: 'A20', section: 'Abstract', text: 'Which shape completes the series: ▲, ▲▲, ▲▲▲, ?', answerIndex: 2 }, // ▲▲▲▲
{ id: 'A21', section: 'Abstract', text: 'Find the next letter: B, D, F, H, ?', answerIndex: 1 }, // J
{ id: 'A22', section: 'Abstract', text: 'Which number comes next: 1, 3, 6, 10, ?', answerIndex: 3 }, // 15
{ id: 'A23', section: 'Abstract', text: 'Find the odd one out: Square, Rectangle, Rhombus, Circle.', answerIndex: 3 }, // Circle
{ id: 'A24', section: 'Abstract', text: 'If 2 + 3 = 10 and 3 + 4 = 21, then 4 + 5 = ?', answerIndex: 0 }, // 36
];

export const APTITUDE_OPTIONS: { [key: string]: string[] } = {
    'Q1': ['47', '55', '63', '71'], 'Q2': ['Rs 460', 'Rs 480', 'Rs 500', 'Rs 520'], 'Q3': ['6:8', '8:15', '2:5', '10:12'],
    'Q4': ['2 days', '5 days', '7.5 days', '10 days'], 'Q5': ['90', '400', '600', '900'], 'Q6': ['15 m/s', '20 m/s', '25 m/s', '36 m/s'],
    'Q7': ['30', '35', '40', '45'], 'Q8': ['Rs 50', 'Rs 100', 'Rs 105', 'Rs 150'],
    'Q13': ['Calm', 'Dangerous', 'Fragile', 'Temporary'], 'Q14': ['Fleeting', 'Temporary', 'Permanent', 'Vague'], 'Q15': ['Sky', 'Desert', 'Land', 'Mountain'],
    'Q16': ['Sparrow', 'Eagle', 'Bat', 'Crow'], 'Q17': ['Archaeologist', 'Ornithologist', 'Entomologist', 'Anthropologist'], 'Q18': ['(1), (2), (4), (3)', '(2), (1), (4), (3)', '(3), (4), (1), (2)', '(2), (4), (1), (3)'],
    'Q19': ['Careless', 'Lazy', 'Detailed', 'Rude'], 'Q20': ['Honest', 'Truthful', 'Devious', 'Direct'],
    'Q25': ['L facing down and right', 'L facing up and left', 'L facing down and left', 'The original L shape'], 'Q26': ['Solid Black Circle', 'Hollow White Square', 'Hollow White Triangle', 'Solid White Square'], 'Q27': ['Box with 5 dots', 'Box with 9 dots', 'Box with 16 dots', 'Box with 25 dots'],
    'Q28': ['A figure with 3 lines', 'A figure with 4 lines', 'A figure with 5 lines', 'A figure with 6 lines'], 'Q29': ['Arrow pointing up and to the left', 'Arrow pointing down and to the left', 'Arrow pointing up and to the right', 'Arrow pointing down and to the right'],
    'Q30': ['Octagon', 'Heptagon', 'Hexagon', 'Decagon'], 'Q31': ['Top-Left', 'Top-Right', 'Bottom-Left', 'The Center'], 'Q32': ['One circle', 'Two intersecting horizontal lines', 'Three circles', 'One square'],
};

// --- B. RIASEC + OCEAN QUESTIONS (33 Questions) ---
export const PROFILE_QUESTIONS: IProfileQuestion[] = [
    // RIASEC (18 Qs)
    { id: 'R1', type: 'Realistic', factor: 'RIASEC', text: 'I enjoy working with tools or machines.', isReversed: false, scale: 'Interest' },
{ id: 'R2', type: 'Realistic', factor: 'RIASEC', text: 'I like doing hands-on tasks that involve building or fixing things.', isReversed: false, scale: 'Interest' },
{ id: 'R3', type: 'Realistic', factor: 'RIASEC', text: 'I prefer physical work over desk work.', isReversed: false, scale: 'Interest' },
{ id: 'R4', type: 'Realistic', factor: 'RIASEC', text: 'I enjoy working outdoors or in practical environments.', isReversed: false, scale: 'Interest' },
{ id: 'R5', type: 'Realistic', factor: 'RIASEC', text: 'I like operating equipment or machinery.', isReversed: false, scale: 'Interest' },
{ id: 'R6', type: 'Realistic', factor: 'RIASEC', text: 'I feel comfortable doing manual or technical tasks.', isReversed: false, scale: 'Interest' },

{ id: 'I1', type: 'Investigative', factor: 'RIASEC', text: 'I enjoy solving logical or mathematical problems.', isReversed: false, scale: 'Interest' },
{ id: 'I2', type: 'Investigative', factor: 'RIASEC', text: 'I like understanding how things work.', isReversed: false, scale: 'Interest' },
{ id: 'I3', type: 'Investigative', factor: 'RIASEC', text: 'I enjoy doing experiments or research activities.', isReversed: false, scale: 'Interest' },
{ id: 'I4', type: 'Investigative', factor: 'RIASEC', text: 'I like reading or learning about science and technology.', isReversed: false, scale: 'Interest' },
{ id: 'I5', type: 'Investigative', factor: 'RIASEC', text: 'I enjoy analyzing data or finding patterns.', isReversed: false, scale: 'Interest' },
{ id: 'I6', type: 'Investigative', factor: 'RIASEC', text: 'I prefer thinking and problem-solving tasks.', isReversed: false, scale: 'Interest' },

{ id: 'A1', type: 'Artistic', factor: 'RIASEC', text: 'I enjoy creative activities like drawing, writing, or designing.', isReversed: false, scale: 'Interest' },
{ id: 'A2', type: 'Artistic', factor: 'RIASEC', text: 'I like expressing my ideas in creative ways.', isReversed: false, scale: 'Interest' },
{ id: 'A3', type: 'Artistic', factor: 'RIASEC', text: 'I enjoy working on tasks without strict rules.', isReversed: false, scale: 'Interest' },
{ id: 'A4', type: 'Artistic', factor: 'RIASEC', text: 'I like activities that involve imagination and originality.', isReversed: false, scale: 'Interest' },
{ id: 'A5', type: 'Artistic', factor: 'RIASEC', text: 'I enjoy designing visual or artistic content.', isReversed: false, scale: 'Interest' },
{ id: 'A6', type: 'Artistic', factor: 'RIASEC', text: 'I prefer creative work over routine tasks.', isReversed: false, scale: 'Interest' },

{ id: 'S1', type: 'Social', factor: 'RIASEC', text: 'I enjoy helping others with their problems.', isReversed: false, scale: 'Interest' },
{ id: 'S2', type: 'Social', factor: 'RIASEC', text: 'I like teaching or explaining things to people.', isReversed: false, scale: 'Interest' },
{ id: 'S3', type: 'Social', factor: 'RIASEC', text: 'I enjoy working closely with other people.', isReversed: false, scale: 'Interest' },
{ id: 'S4', type: 'Social', factor: 'RIASEC', text: 'I feel satisfied when I support or guide others.', isReversed: false, scale: 'Interest' },
{ id: 'S5', type: 'Social', factor: 'RIASEC', text: 'I like being involved in group or community activities.', isReversed: false, scale: 'Interest' },
{ id: 'S6', type: 'Social', factor: 'RIASEC', text: 'I enjoy roles where I interact and cooperate with others.', isReversed: false, scale: 'Interest' },

{ id: 'E1', type: 'Enterprising', factor: 'RIASEC', text: 'I enjoy leading a group or project.', isReversed: false, scale: 'Interest' },
{ id: 'E2', type: 'Enterprising', factor: 'RIASEC', text: 'I like persuading others to accept my ideas.', isReversed: false, scale: 'Interest' },
{ id: 'E3', type: 'Enterprising', factor: 'RIASEC', text: 'I enjoy taking initiative and making decisions.', isReversed: false, scale: 'Interest' },
{ id: 'E4', type: 'Enterprising', factor: 'RIASEC', text: 'I like setting goals and working towards success.', isReversed: false, scale: 'Interest' },
{ id: 'E5', type: 'Enterprising', factor: 'RIASEC', text: 'I enjoy competitive environments.', isReversed: false, scale: 'Interest' },
{ id: 'E6', type: 'Enterprising', factor: 'RIASEC', text: 'I feel confident taking responsibility for outcomes.', isReversed: false, scale: 'Interest' },

{ id: 'C1', type: 'Conventional', factor: 'RIASEC', text: 'I enjoy organizing information or records.', isReversed: false, scale: 'Interest' },
{ id: 'C2', type: 'Conventional', factor: 'RIASEC', text: 'I like working with structured rules and procedures.', isReversed: false, scale: 'Interest' },
{ id: 'C3', type: 'Conventional', factor: 'RIASEC', text: 'I enjoy handling data, numbers, or accounts.', isReversed: false, scale: 'Interest' },
{ id: 'C4', type: 'Conventional', factor: 'RIASEC', text: 'I prefer tasks that require accuracy and attention to detail.', isReversed: false, scale: 'Interest' },
{ id: 'C5', type: 'Conventional', factor: 'RIASEC', text: 'I like planning and scheduling tasks.', isReversed: false, scale: 'Interest' },
{ id: 'C6', type: 'Conventional', factor: 'RIASEC', text: 'I feel comfortable following clear instructions.', isReversed: false, scale: 'Interest' },

{ id: 'O1', type: 'Openness', factor: 'OCEAN', text: 'I enjoy learning new ideas and concepts.', isReversed: false, scale: 'Agreement' },
{ id: 'O2', type: 'Openness', factor: 'OCEAN', text: 'I like trying new activities and experiences.', isReversed: false, scale: 'Agreement' },
{ id: 'O3', type: 'Openness', factor: 'OCEAN', text: 'I enjoy thinking deeply about topics.', isReversed: false, scale: 'Agreement' },
{ id: 'O4', type: 'Openness', factor: 'OCEAN', text: 'I am curious about how things work.', isReversed: false, scale: 'Agreement' },

{ id: 'O5', type: 'Openness', factor: 'OCEAN', text: 'I prefer familiar routines over new experiences.', isReversed: true, scale: 'Agreement' },
{ id: 'O6', type: 'Openness', factor: 'OCEAN', text: 'I avoid ideas that are too abstract.', isReversed: true, scale: 'Agreement' },
{ id: 'O7', type: 'Openness', factor: 'OCEAN', text: 'I do not like change in my daily activities.', isReversed: true, scale: 'Agreement' },
{ id: 'O8', type: 'Openness', factor: 'OCEAN', text: 'I am not interested in exploring new ways of thinking.', isReversed: true, scale: 'Agreement' },

{ id: 'C4', type: 'Conscientiousness', factor: 'OCEAN', text: 'I plan my work and complete tasks on time.', isReversed: false, scale: 'Agreement' },
{ id: 'C5', type: 'Conscientiousness', factor: 'OCEAN', text: 'I like to keep my work and surroundings organized.', isReversed: false, scale: 'Agreement' },
{ id: 'C6', type: 'Conscientiousness', factor: 'OCEAN', text: 'I work carefully and pay attention to details.', isReversed: false, scale: 'Agreement' },
{ id: 'C7', type: 'Conscientiousness', factor: 'OCEAN', text: 'I usually finish what I start.', isReversed: false, scale: 'Agreement' },

{ id: 'C8', type: 'Conscientiousness', factor: 'OCEAN', text: 'I often delay important tasks.', isReversed: true, scale: 'Agreement' },
{ id: 'C9', type: 'Conscientiousness', factor: 'OCEAN', text: 'I find it hard to stay organized.', isReversed: true, scale: 'Agreement' },
{ id: 'C10', type: 'Conscientiousness', factor: 'OCEAN', text: 'I leave tasks incomplete.', isReversed: true, scale: 'Agreement' },
{ id: 'C11', type: 'Conscientiousness', factor: 'OCEAN', text: 'I often waste time instead of working.', isReversed: true, scale: 'Agreement' },

{ id: 'E4', type: 'Extraversion', factor: 'OCEAN', text: 'I enjoy talking and interacting with people.', isReversed: false, scale: 'Agreement' },
{ id: 'E5', type: 'Extraversion', factor: 'OCEAN', text: 'I feel comfortable speaking in group discussions.', isReversed: false, scale: 'Agreement' },
{ id: 'E6', type: 'Extraversion', factor: 'OCEAN', text: 'I like being active in social situations.', isReversed: false, scale: 'Agreement' },
{ id: 'E7', type: 'Extraversion', factor: 'OCEAN', text: 'I make friends easily.', isReversed: false, scale: 'Agreement' },

{ id: 'E8', type: 'Extraversion', factor: 'OCEAN', text: 'I prefer to stay quiet in social settings.', isReversed: true, scale: 'Agreement' },
{ id: 'E9', type: 'Extraversion', factor: 'OCEAN', text: 'I avoid being the center of attention.', isReversed: true, scale: 'Agreement' },
{ id: 'E10', type: 'Extraversion', factor: 'OCEAN', text: 'I feel uncomfortable speaking to many people.', isReversed: true, scale: 'Agreement' },
{ id: 'E11', type: 'Extraversion', factor: 'OCEAN', text: 'I like working alone rather than with others.', isReversed: true, scale: 'Agreement' },

{ id: 'A4', type: 'Agreeableness', factor: 'OCEAN', text: 'I care about other people’s feelings.', isReversed: false, scale: 'Agreement' },
{ id: 'A5', type: 'Agreeableness', factor: 'OCEAN', text: 'I try to help others whenever I can.', isReversed: false, scale: 'Agreement' },
{ id: 'A6', type: 'Agreeableness', factor: 'OCEAN', text: 'I am polite and respectful to others.', isReversed: false, scale: 'Agreement' },
{ id: 'A7', type: 'Agreeableness', factor: 'OCEAN', text: 'I avoid unnecessary conflicts.', isReversed: false, scale: 'Agreement' },

{ id: 'A8', type: 'Agreeableness', factor: 'OCEAN', text: 'I am often rude to people.', isReversed: true, scale: 'Agreement' },
{ id: 'A9', type: 'Agreeableness', factor: 'OCEAN', text: 'I do not care much about others’ problems.', isReversed: true, scale: 'Agreement' },
{ id: 'A10', type: 'Agreeableness', factor: 'OCEAN', text: 'I argue with people frequently.', isReversed: true, scale: 'Agreement' },
{ id: 'A11', type: 'Agreeableness', factor: 'OCEAN', text: 'I find it hard to trust others.', isReversed: true, scale: 'Agreement' },

{ id: 'N1', type: 'Neuroticism', factor: 'OCEAN', text: 'I worry a lot about things.', isReversed: false, scale: 'Agreement' },
{ id: 'N2', type: 'Neuroticism', factor: 'OCEAN', text: 'I get stressed easily.', isReversed: false, scale: 'Agreement' },
{ id: 'N3', type: 'Neuroticism', factor: 'OCEAN', text: 'My mood changes quickly.', isReversed: false, scale: 'Agreement' },
{ id: 'N4', type: 'Neuroticism', factor: 'OCEAN', text: 'I feel nervous in difficult situations.', isReversed: false, scale: 'Agreement' },

{ id: 'N5', type: 'Neuroticism', factor: 'OCEAN', text: 'I remain calm even under pressure.', isReversed: true, scale: 'Agreement' },
{ id: 'N6', type: 'Neuroticism', factor: 'OCEAN', text: 'I rarely feel anxious.', isReversed: true, scale: 'Agreement' },
{ id: 'N7', type: 'Neuroticism', factor: 'OCEAN', text: 'I handle stress very well.', isReversed: true, scale: 'Agreement' },
{ id: 'N8', type: 'Neuroticism', factor: 'OCEAN', text: 'I stay emotionally stable most of the time.', isReversed: true, scale: 'Agreement' },
];

// --- SCORING SCALE LABELS ---
export const SCALES: { [key: string]: { labels: string[], title: string } } = {
    Interest: {
        labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        title: "Interest/Enjoyment (RIASEC)",
    },
    Agreement: {
        labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        title: "Agreement (OCEAN)",
    },
};

export const TOTAL_QUESTIONS_APTITUDE = APTITUDE_QUESTIONS.length;
export const TOTAL_QUESTIONS_PROFILE = PROFILE_QUESTIONS.length;
export const TOTAL_QUESTIONS = TOTAL_QUESTIONS_APTITUDE + TOTAL_QUESTIONS_PROFILE;