const PERFUME_PROFILES = {
    date: {
        preferredProfiles: ["sweet"],
        preferredNotes: ["Vanilla", "Musk", "Amber", "Rose", "Jasmine"],
        preferredStrengths: [3, 4, 5],
        displayLabel: "Romantic & Sensual"
    },
    college: {
        preferredProfiles: ["fresh"],
        preferredNotes: ["Citrus", "Aqua", "Green Tea", "Bergamot", "Lemon"],
        preferredStrengths: [1, 2, 3],
        displayLabel: "Fresh & Energetic"
    },
    party: {
        preferredProfiles: ["strong"],
        preferredNotes: ["Oud", "Spices", "Leather", "Amber", "Black Currant"],
        preferredStrengths: [4, 5],
        displayLabel: "Bold & Statement"
    },
    office: {
        preferredProfiles: ["mild"],
        preferredNotes: ["Lavender", "Cedar", "Sandalwood", "Sage", "Vetiver"],
        preferredStrengths: [2, 3, 4],
        displayLabel: "Polished & Professional"
    },
    gym: {
        preferredProfiles: ["fresh"],
        preferredNotes: ["Mint", "Lemon", "Aqua", "Marine Notes", "Verbena"],
        preferredStrengths: [1, 2],
        displayLabel: "Fresh & Sporty"
    },
    festival: {
        preferredProfiles: ["strong"],
        preferredNotes: ["Rose", "Jasmine", "Sandalwood", "Oud", "Saffron"],
        preferredStrengths: [4, 5],
        displayLabel: "Elegant & Traditional"
    }
};

const calculateMatchScore = (perfume, occasion) => {
    const targetProfile = PERFUME_PROFILES[occasion];
    if (!targetProfile) return 0;

    let totalScore = 0;

    if (perfume.occasions.includes(occasion)) totalScore += 40;
    if (targetProfile.preferredProfiles.includes(perfume.profile)) totalScore += 20;
    if (targetProfile.preferredStrengths.includes(perfume.strength)) totalScore += 15;

    const allPerfumeNotes = [
        ...perfume.notes.top,
        ...perfume.notes.middle,
        ...perfume.notes.base
    ].map(note => note.toLowerCase());

    const noteWeight = 25 / targetProfile.preferredNotes.length;

    targetProfile.preferredNotes.forEach(targetNote => {
        if (allPerfumeNotes.some(perfumeNote => perfumeNote.includes(targetNote.toLowerCase()))) {
            totalScore += noteWeight;
        }
    });

    return Math.round(totalScore);
};

const generateRecommendationReason = (perfume, occasion) => {
    const targetProfile = PERFUME_PROFILES[occasion];
    const topNote = perfume.notes.top[0];
    const baseNote = perfume.notes.base[0];

    return `The perfect choice for your ${occasion}. It opens with refreshing ${topNote} and settles into a lasting ${baseNote} base, making it a very ${targetProfile.displayLabel.toLowerCase()} fragrance.`;
};

export const getRecommendations = (allProducts, selectedOccasion) => {
    const scoredProducts = allProducts.map(product => ({
        ...product,
        matchPercentage: calculateMatchScore(product, selectedOccasion),
        reasoning: generateRecommendationReason(product, selectedOccasion)
    }));

    const sortedRecommendations = scoredProducts.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return sortedRecommendations.slice(0, 3);
};
