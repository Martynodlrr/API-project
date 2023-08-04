export const renderAvgRating = rating => {
    if (rating % 1 === 0.5) {
        return rating.toString();
    }

    let roundedRating = Math.round(rating);

    if (Number.isInteger(roundedRating)) {
        return `${roundedRating}.0`;
    } else {
        roundedRating = Math.round(rating * 2) / 2;
        return roundedRating.toString();
    }
};
