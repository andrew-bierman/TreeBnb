export const openModal = () => {
    setIsActive(true);
};

export const closeModal = () => {
    setIsActive(false);
};

export const closeAllModals = () => {
    setIsActive(false);
};

export const handleKeyDown = (event) => {
    if (event.keyCode === 27) { // Escape key
        closeAllModals();
    }
};