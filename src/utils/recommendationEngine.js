const SCENT_PROFILES = {
    date: {
        matches: ["sweet"],
        notes: ["Vanilla", "Musk", "Amber", "Rose", "Jasmine"],
        idealStrength: [3, 4, 5],
        label: "Romantic & Sensual"
    },
    college: {
        matches: ["fresh"],
        notes: ["Citrus", "Aqua", "Green Tea", "Bergamot", "Lemon"],
        idealStrength: [1, 2, 3],
        label: "Fresh & Energetic"
    },
    party: {
        matches: ["strong"],
        notes: ["Oud", "Spices", "Leather", "Amber", "Black Currant"],
        idealStrength: [4, 5],
        label: "Bold & Statement"
    },
    office: {
        matches: ["mild"],
        notes: ["Lavender", "Cedar", "Sandalwood", "Sage", "Vetiver"],
        idealStrength: [2, 3, 4],
        label: "Polished & Professional"
    },
    gym: {
        matches: ["fresh"],
        notes: ["Mint", "Lemon", "Aqua", "Marine Notes", "Verbena"],
        idealStrength: [1, 2],
        label: "Fresh & Sporty"
    },
    festival: {
        matches: ["strong"],
        notes: ["Rose", "Jasmine", "Sandalwood", "Oud", "Saffron"],
        idealStrength: [4, 5],
        label: "Elegant & Traditional"
    }
};

const calculateMatchScore = (perfume, selectedOccasion) => {
    const rules = SCENT_PROFILES[selectedOccasion];
    if (!rules) return 0;

    let points = 0;

    if (perfume.occasions.includes(selectedOccasion)) {
        points += 40;
    }

    if (rules.matches.includes(perfume.profile)) {
        points += 20;
    }

    if (rules.idealStrength.includes(perfume.strength)) {
        points += 15;
    }

    const perfumeNotes = [...perfume.notes.top, ...perfume.notes.middle, ...perfume.notes.base];
    const weightPerNote = 25 / rules.notes.length;

    rules.notes.forEach(neededNote => {
        if (perfumeNotes.some(note => note.toLowerCase().includes(neededNote.toLowerCase()))) {
            points += weightPerNote;
        }
    });

    return Math.round(points);
};

const getRecommendationReasons = (perfume, occasion) => {
    const rules = SCENT_PROFILES[occasion];
    const topNote = perfume.notes.top[0];
    const baseNote = perfume.notes.base[0];

    return `The perfect choice for your ${occasion}. It opens with refreshing ${topNote} and settles into a lasting ${baseNote} base, making it a very ${rules.label.toLowerCase()} fragrance.`;
};

export const getRecommendations = (allProducts, occasion) => {
    const scoredList = allProducts.map(perfume => {
        const score = calculateMatchScore(perfume, occasion);

        return {
            ...perfume,
            matchPercentage: score,
            reasoning: getRecommendationReasons(perfume, occasion)
        };
    });

    return scoredList
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 3);
};
