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

const Button: React.FC<ButtonProp> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon
}) => {
    return (
        <button className = {`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            `}>{label}</button>
    );
}

export default Button;