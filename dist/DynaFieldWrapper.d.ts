import * as React from "react";
import "./style.less";
import "./color.less";
export interface IDynaFieldWrapperProps {
    className?: string;
    style?: EStyle;
    color?: EColor;
    label?: TContent;
    required?: TContent;
    isLoading?: TContent;
    children: any;
    inputElementSelector?: string;
    validationMessage?: TContent;
    footer?: TContent;
}
export declare type TContent = string | JSX.Element;
export declare enum EStyle {
    INLINE_ROUNDED = "INLINE_ROUNDED",
}
export declare enum EColor {
    WHITE_BLACK = "WHITE_BLACK",
    GRAY_WHITE_BLACK = "GRAY_WHITE_BLACK",
    WHITE_RED = "WHITE_RED",
    BLACK_WHITE = "BLACK_WHITE",
    ORANGE_WHITE = "ORANGE_WHITE",
    TRANSPARENT_WHITE = "TRANSPARENT_WHITE",
}
export declare class DynaFieldWrapper extends React.Component<IDynaFieldWrapperProps> {
    static defaultProps: IDynaFieldWrapperProps;
    private internalId;
    private controlContainerElement;
    private readonly inputElement;
    componentDidMount(): void;
    private handleContainerClick();
    render(): JSX.Element;
}
