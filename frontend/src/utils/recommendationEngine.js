const PERFUME_PROFILES = {
    date: {
        profiles: ["sweet"],
        notes: ["Vanilla", "Musk", "Amber", "Rose", "Jasmine"],
        strengths: [3, 4, 5],
        label: "Romantic & Sensual"
    },
    college: {
        profiles: ["fresh"],
        notes: ["Citrus", "Aqua", "Green Tea", "Bergamot", "Lemon"],
        strengths: [1, 2, 3],
        label: "Fresh & Energetic"
    },
    party: {
        profiles: ["strong"],
        notes: ["Oud", "Spices", "Leather", "Amber", "Black Currant"],
        strengths: [4, 5],
        label: "Bold & Statement"
    },
    office: {
        profiles: ["mild"],
        notes: ["Lavender", "Cedar", "Sandalwood", "Sage", "Vetiver"],
        strengths: [2, 3, 4],
        label: "Polished & Professional"
    },
    gym: {
        profiles: ["fresh"],
        notes: ["Mint", "Lemon", "Aqua", "Marine Notes", "Verbena"],
        strengths: [1, 2],
        label: "Fresh & Sporty"
    },
    festival: {
        profiles: ["strong"],
        notes: ["Rose", "Jasmine", "Sandalwood", "Oud", "Saffron"],
        strengths: [4, 5],
        label: "Elegant & Traditional"
    }
};

const calculateScore = (perfume, occasion) => {
    const target = PERFUME_PROFILES[occasion];
    if (!target) return 0;

    let score = 0;
    if (perfume.occasions.includes(occasion)) score += 40;
    if (target.profiles.includes(perfume.profile)) score += 20;
    if (target.strengths.includes(perfume.strength)) score += 15;

    const notes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
    ].map(n => n.toLowerCase());

    const weight = 25 / target.notes.length;
    target.notes.forEach(note => {
        if (notes.some(n => n.includes(note.toLowerCase()))) score += weight;
    });

    return Math.round(score);
};

const getReason = (perfume, occasion) => {
    const target = PERFUME_PROFILES[occasion];
    return `The perfect choice for your ${occasion}. It opens with refreshing ${perfume.notes.top[0]} and settles into a lasting ${perfume.notes.base[0]} base, making it a very ${target.label.toLowerCase()} fragrance.`;
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
