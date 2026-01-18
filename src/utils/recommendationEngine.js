const SCENT_PROFILES = {
    date: {
        matches: ["sweet"],
        notes: ["Vanilla", "Musk", "Amber", "Rose", "Jasmine"],
        strengths: [3, 4, 5],
        label: "Romantic & Sensual"
    },
    college: {
        matches: ["fresh"],
        notes: ["Citrus", "Aqua", "Green Tea", "Bergamot", "Lemon"],
        strengths: [1, 2, 3],
        label: "Fresh & Energetic"
    },
    party: {
        matches: ["strong"],
        notes: ["Oud", "Spices", "Leather", "Amber", "Black Currant"],
        strengths: [4, 5],
        label: "Bold & Statement"
    },
    office: {
        matches: ["mild"],
        notes: ["Lavender", "Cedar", "Sandalwood", "Sage", "Vetiver"],
        strengths: [2, 3, 4],
        label: "Polished & Professional"
    },
    gym: {
        matches: ["fresh"],
        notes: ["Mint", "Lemon", "Aqua", "Marine Notes", "Verbena"],
        strengths: [1, 2],
        label: "Fresh & Sporty"
    },
    festival: {
        matches: ["strong"],
        notes: ["Rose", "Jasmine", "Sandalwood", "Oud", "Saffron"],
        strengths: [4, 5],
        label: "Elegant & Traditional"
    }
};

const calculateScore = (perfume, occasion) => {
    const profile = SCENT_PROFILES[occasion];
    if (!profile) return 0;

    let score = 0;

    if (perfume.occasions.includes(occasion)) score += 40;
    if (profile.matches.includes(perfume.profile)) score += 20;
    if (profile.strengths.includes(perfume.strength)) score += 15;

    const allNotes = [...perfume.notes.top, ...perfume.notes.middle, ...perfume.notes.base].map(n => n.toLowerCase());
    const noteWeight = 25 / profile.notes.length;

    profile.notes.forEach(note => {
        if (allNotes.some(n => n.includes(note.toLowerCase()))) score += noteWeight;
    });

    return Math.round(score);
};

const getReason = (perfume, occasion) => {
    const profile = SCENT_PROFILES[occasion];
    const top = perfume.notes.top[0];
    const base = perfume.notes.base[0];
    return `The perfect choice for your ${occasion}. It opens with refreshing ${top} and settles into a lasting ${base} base, making it a very ${profile.label.toLowerCase()} fragrance.`;
};

export const getRecommendations = (products, occasion) => {
    return products
        .map(p => ({
            ...p,
            matchPercentage: calculateScore(p, occasion),
            reasoning: getReason(p, occasion)
        }))
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 3);
};
