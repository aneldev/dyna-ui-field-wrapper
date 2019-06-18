import * as React from "react";
import {MouseEvent} from "react";
import {guid} from "dyna-guid";
import {EColor} from "dyna-ui-styles"

import "./style-base.less";
import "./style-INLINE_ROUNDED.less";
import "./style-SMALL_LABEL_ROUNDED.less";
import "./style-WIDE_LABEL_ROUNDED.less";
import "./color.less";

export interface IDynaFieldWrapperProps {
  className?: string;
  id?: string;              // default: guid
  applyLabelId?: boolean;   // default: true
  applyInputId?: boolean;   // default: true
  mode?: EMode;
  style?: EStyle;
  color?: EColor;
  size?: ESize;
  label?: TContent;
  required?: TContent;
  isLoading?: TContent;
  children: any;
  inputElementSelector?: string;  // to manipulate a HTMLInputElement
  validationMessage?: TContent;
  footer?: TContent;
  onFocus?: () => void;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onOutsideClick?: (event: MouseEvent<any>) => void;
}

export type TContent = string | JSX.Element;

export {EColor}

export enum EMode {
  VIEW = "VIEW",
  EDIT = "EDIT",
}

export enum EStyle {
  INLINE_ROUNDED = "INLINE_ROUNDED",
  SMALL_LABEL_ROUNDED = "SMALL_LABEL_ROUNDED",
  WIDE_LABEL_ROUNDED = "WIDE_LABEL_ROUNDED",
}

export enum ESize {
  XSMALL = "XSMALL",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export class DynaFieldWrapper extends React.Component<IDynaFieldWrapperProps> {
  static defaultProps: IDynaFieldWrapperProps = {
    className: null,
    id: null,
    mode: EMode.EDIT,
    style: EStyle.INLINE_ROUNDED,
    color: EColor.WHITE_BLACK,
    size: ESize.MEDIUM,
    label: null,
    required: null,
    isLoading: null,
    applyLabelId: true,
    applyInputId: true,
    children: null,
    inputElementSelector: null,
    validationMessage: null,
    footer: null,
    onClick: () => undefined,
    onFocus: () => undefined,
    onOutsideClick: () => undefined,
  };

  private internalHtmlId: string;
  private controlContainerElement: HTMLDivElement;

  public refs: {
    container: Element,
  };

  constructor(props: IDynaFieldWrapperProps) {
    super(props);
    const { id } = props;
    this.internalHtmlId = id || `dyna-field-wrapper-html-id--${guid()}`;

    if (document && document.body && document.body.addEventListener) {
      document.body.addEventListener('click', this.handleGlobalClick);
    }
  }

  public componentWillUnmount(): void {
    document.body.removeEventListener('click', this.handleGlobalClick);
  }

  private handleGlobalClick = (event: any): void => {
    if (!this.refs.container.contains(event.target as Element)) {
      this.props.onOutsideClick(event);
    }
  };

  public componentDidMount() {
    this.applyHtmlIdOnInput();
  }

  private applyHtmlIdOnInput(): void {
    const inputElement = this.props.inputElementSelector &&
      this.controlContainerElement &&
      this.controlContainerElement.querySelector(this.props.inputElementSelector)
      || null;

    if (!this.props.inputElementSelector) return;
    if (!this.props.applyInputId) return;

    if (inputElement) {
      inputElement.setAttribute('id', this.internalHtmlId);
    }
    else {
      console.error(`DynaFieldWrapper: the inputElementSelector is defined but doesn't return any input control, inputElementSelector: [${this.props.inputElementSelector}]`);
    }
  }

  private handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    this.props.onClick(event);
  };

  private handleLabelClick = (event: MouseEvent<HTMLDivElement>): void => {
    const controlElement: HTMLInputElement = this.controlContainerElement.querySelector(this.props.inputElementSelector);
    if (controlElement) controlElement.focus();
    this.props.onFocus();
  };

  private handleContainerClick = (event: MouseEvent<HTMLDivElement>): void => {
    const controlElement: HTMLInputElement = this.controlContainerElement.querySelector(this.props.inputElementSelector);
    if (event.target !== event.currentTarget) return;
    if (controlElement) controlElement.focus();
    this.props.onFocus();
  };

  public render(): JSX.Element {
    const {
      className: cn,
      mode, style, color, size,
      label, required, isLoading,
      applyLabelId,
      children,
      validationMessage, footer,
    } = this.props;

    const className: string = [
      cn || '',
      'dyna-ui-field-wrapper',
      `dyna-ui-field-wrapper--mode-${mode}`,
      `dyna-ui-field-wrapper--style-${style}`,
      `dyna-ui-field-wrapper--color-${color}`,
      `dyna-ui-field-wrapper--size-${size}`,
    ].join(' ').trim();

    return (
      <div className={className} onClick={this.handleClick} ref="container">
        {label ?
          <div className="dyna-ui-label" onClick={this.handleLabelClick}>
            <label htmlFor={applyLabelId && this.internalHtmlId || undefined} onClick={e => e.stopPropagation()}>{label}</label>
          </div>
          : null}
        <div className="dyna-ui-field-wrapper-container" onClick={this.handleContainerClick}>
          <div className="dyna-ui-field-wrapper-required" onClick={this.handleContainerClick}>{required}</div>
          <div className="dyna-ui-field-wrapper-isLoading" onClick={this.handleContainerClick}>{isLoading}</div>
          <div
            className="dyna-ui-field-wrapper-control-container"
            ref={element => this.controlContainerElement = element}
            onClick={this.handleContainerClick}
          >{children}</div>
          <div className="dyna-ui-field-wrapper-validation-message" onClick={this.handleContainerClick}>{validationMessage}</div>
          <div className="dyna-ui-field-wrapper-footer" onClick={this.handleContainerClick}>{footer}</div>
        </div>
      </div>
    );
  }
}
