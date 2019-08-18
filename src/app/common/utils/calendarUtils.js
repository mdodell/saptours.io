export const numberOfToursInMonth = (tours, guideId) => {
    let count = 0;
    tours.forEach(tour => {
        if(tour.assignedGuideIds.includes(guideId)){
            count++;
        }
    });
    return count;
};