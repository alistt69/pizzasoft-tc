declare module 'react-input-mask' {
    import React from 'react';

    interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
        mask: string;
        maskChar?: string;
        formatChars?: { [key: string]: string };
        alwaysShowMask?: boolean;
        beforeMaskedValueChange?: (
            newState: { value: string; selection: { start: number; end: number } },
            oldState: { value: string; selection: { start: number; end: number } },
            userInput: string,
            maskOptions: { mask: string; maskChar: string; formatChars: { [key: string]: string } }
        ) => { value: string; selection: { start: number; end: number } };
        children?: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode;
    }

    const InputMask: React.FC<InputMaskProps>;

    export default InputMask;
}