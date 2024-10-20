'use client';

import { IconType } from "react-icons";

interface ButtonProp {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType
}

const Button = () => {
    return (
        <button> </button>
    );
}

export default Button;