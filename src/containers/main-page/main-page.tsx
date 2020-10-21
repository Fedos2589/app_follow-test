import './main-page.scss';
import React, { useState, useCallback } from 'react';
import { Button, Modal } from 'semantic-ui-react';

const MainPage = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleOpen = useCallback(() => setModalOpen(true), []);
    const handleClose = useCallback(() => setModalOpen(false), []);

    return (
        <div className="main-page">
            <Button primary onClick={handleOpen}>
                Ввести данные
            </Button>
            <Modal onClose={handleClose} onOpen={handleOpen} open={isModalOpen} closeIcon>
                <Modal.Content>text</Modal.Content>
                <Modal.Actions></Modal.Actions>
            </Modal>
        </div>
    );
};

export default MainPage;
