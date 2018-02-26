import * as React from "react";
import {guid} from "dyna-guid";
import {EColor} from "dyna-ui-styles"

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
  inputElementSelector?: string;  // to manipulate a HTMLInputElement
  validationMessage?: TContent;
  footer?: TContent;
  onClick?: () => void;
  onFocus?: () => void;
}

export type TContent = string | JSX.Element;

export {EColor}

export enum EMode {
  VIEW = "VIEW",
  EDIT = "EDIT",
}

export enum EStyle {
  INLINE_ROUNDED = "INLINE_ROUNDED",
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
    mode: EMode.EDIT,
    style: EStyle.INLINE_ROUNDED,
    color: EColor.WHITE_BLACK,
    size: ESize.MEDIUM,
    label: null,
    required: null,
    isLoading: null,
    children: null,
    inputElementSelector: null,
    validationMessage: null,
    footer: null,
    onClick: () => undefined,
    onFocus: () => undefined,
  };

  private internalId: string = guid();
  private controlContainerElement: HTMLDivElement;

  private get inputElement(): HTMLInputElement {
    return this.props.inputElementSelector &&
      this.controlContainerElement &&
      this.controlContainerElement.querySelector(this.props.inputElementSelector)
      || null;
  }

  public componentDidMount() {
    if (this.props.inputElementSelector) {
      if (!this.inputElement) {
        console.error(`DynaFieldWrapper: the inputElementSelector is defined but doesn't return any input control, inputElementSelector: [${this.props.inputElementSelector}]`);
      }
      else {
        this.inputElement && this.inputElement.setAttribute('id', this.internalId);
      }
    }
  }

  private handleClick(event: MouseEvent): void {
    this.props.onClick();
  }

  private handleLabelClick(event: MouseEvent): void {
    const controlElement: HTMLInputElement = this.controlContainerElement.querySelector(this.props.inputElementSelector);
    if (controlElement) controlElement.focus();
    this.props.onFocus();
  }

  private handleContainerClick(event: MouseEvent): void {
    const controlElement: HTMLInputElement = this.controlContainerElement.querySelector(this.props.inputElementSelector);
    if (event.target !== event.currentTarget) return;
    if (controlElement) controlElement.focus();
    this.props.onFocus();
  }

  public render(): JSX.Element {
    const {
      className: cn,
      mode, style, color, size,
      label, required, isLoading,
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
      <div className={className} onClick={this.handleClick.bind(this)}>
        {label ?
          <div className="dyna-ui-label" onClick={this.handleLabelClick.bind(this)}>
            <label htmlFor={this.internalId} onClick={e=>e.stopPropagation()} >{label}</label>
          </div>
          : null}
        <div className="dyna-ui-field-wrapper-container" onClick={this.handleContainerClick.bind(this)}>
          <div className="dyna-ui-field-wrapper-required" onClick={this.handleContainerClick.bind(this)}>{required}</div>
          <div className="dyna-ui-field-wrapper-isLoading" onClick={this.handleContainerClick.bind(this)}>{isLoading}</div>
          <div className="dyna-ui-field-wrapper-control-container" ref={element => this.controlContainerElement = element} onClick={this.handleContainerClick.bind(this)}>
            {children}
          </div>
          <div className="dyna-ui-field-wrapper-validation-message" onClick={this.handleContainerClick.bind(this)}>{validationMessage}</div>
          <div className="dyna-ui-field-wrapper-footer" onClick={this.handleContainerClick.bind(this)}>{footer}</div>
        </div>
      </div>
    );
  }
}
