import React, { useState } from "react";

const BulmaModal = ({ modalTitle, buttonTitle, content, save, buttonStyle, isCard = false }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleModal = () => setIsActive(!isActive);

    const handleSave = () => {
        save();
        toggleModal();
    };

    return (
        <div>
            <button
                className={`button ${buttonStyle}`}
                onClick={() => {
                    toggleModal()

                }
                }
            >
                {buttonTitle}
            </button>

            <div className={`modal ${isActive ? "is-active" : ""}`}>
                <div className="modal-background" onClick={toggleModal} />

                {
                    isCard ? (
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">{modalTitle}</p>
                                <button className="delete" onClick={toggleModal} />
                            </header>

                            <section className="modal-card-body">{content}</section>
                            <footer className="modal-card-foot">
                                <button className="button is-success" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="button" onClick={toggleModal}>
                                    Cancel
                                </button>
                            </footer>
                        </div>
                    ) : (
                        <div>
                            {/* <div className="modal-background"></div> */}
                            <div className="box modal-content">
                                {content(isActive)}
                            </div>
                            <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
                        </div>
                    )


                }

            </div>
        </div>
    );
};

export default BulmaModal;
