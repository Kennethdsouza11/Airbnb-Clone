'use client';

import React from "react";
import { useEffect, useState } from 'react';

// useCallback memorizes the function so that it only gets re-created if any dependencies changes.

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel

}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);

    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);

        //creating a closing animation which delays the onClose function by 300 ms
        setTimeout(()=> {
            onClose();
        }, 300)
    }, [disabled, onClose]);
    return (
        <div> </div>
    );
}

export default Modal;