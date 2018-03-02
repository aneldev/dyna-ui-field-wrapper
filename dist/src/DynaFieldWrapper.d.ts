import * as React from "react";
import { EColor } from "dyna-ui-styles";
import "./style.less";
import "./color.less";
export interface IDynaFieldWrapperProps {
    className?: string;
    mode?: EMode;
    style?: EStyle;
    color?: EColor;
    size?: ESize;
    label?: TContent;
    required?: TContent;
    isLoading?: TContent;
    children: any;
    inputElementSelector?: string;
    validationMessage?: TContent;
    footer?: TContent;
    onFocus?: () => void;
    onClick?: (event: MouseEvent) => void;
    onOutsideClick?: (event: MouseEvent) => void;
}
export declare type TContent = string | JSX.Element;
export { EColor };
export declare enum EMode {
    VIEW = "VIEW",
    EDIT = "EDIT",
}
export declare enum EStyle {
    INLINE_ROUNDED = "INLINE_ROUNDED",
}
export declare enum ESize {
    XSMALL = "XSMALL",
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}
export declare class DynaFieldWrapper extends React.Component<IDynaFieldWrapperProps> {
    static defaultProps: IDynaFieldWrapperProps;
    private internalId;
    private controlContainerElement;
    refs: {
        container: Element;
    };
    constructor(props: IDynaFieldWrapperProps);
    componentWillUnmount(): void;
    private handleGlobalClick(event);
    private readonly inputElement;
    componentDidMount(): void;
    private handleClick(event);
    private handleLabelClick(event);
    private handleContainerClick(event);
    render(): JSX.Element;
}
