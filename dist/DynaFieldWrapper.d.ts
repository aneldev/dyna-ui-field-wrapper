import * as React from "react";
import { MouseEvent } from "react";
import { EColor } from "dyna-ui-styles";
import "./style-base.less";
import "./style-INLINE_ROUNDED.less";
import "./style-SMALL_LABEL_ROUNDED.less";
import "./style-WIDE_LABEL_ROUNDED.less";
import "./color.less";
export interface IDynaFieldWrapperProps {
    className?: string;
    id?: string;
    applyLabelId?: boolean;
    applyInputId?: boolean;
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
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onOutsideClick?: (event: MouseEvent<any>) => void;
}
export declare type TContent = string | JSX.Element;
export { EColor };
export declare enum EMode {
    VIEW = "VIEW",
    EDIT = "EDIT"
}
export declare enum EStyle {
    INLINE_ROUNDED = "INLINE_ROUNDED",
    SMALL_LABEL_ROUNDED = "SMALL_LABEL_ROUNDED",
    WIDE_LABEL_ROUNDED = "WIDE_LABEL_ROUNDED"
}
export declare enum ESize {
    XSMALL = "XSMALL",
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}
export declare class DynaFieldWrapper extends React.Component<IDynaFieldWrapperProps> {
    static defaultProps: IDynaFieldWrapperProps;
    private internalHtmlId;
    private controlContainerElement;
    refs: {
        container: Element;
    };
    constructor(props: IDynaFieldWrapperProps);
    componentWillUnmount(): void;
    private handleGlobalClick;
    componentDidMount(): void;
    private applyHtmlIdOnInput;
    private handleClick;
    private handleLabelClick;
    private handleContainerClick;
    render(): JSX.Element;
}
