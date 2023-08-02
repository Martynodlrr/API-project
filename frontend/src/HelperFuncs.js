export const renderAvgRating = rating => {
    const strRating = rating.toString();
    return strRating.includes('.') ? strRating : `${rating}.0`;
};
