import * as React from "react";
import {guid} from "dyna-guid";

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
  inputElementSelector?: string;  // to manipulate a HTMLInputElement
  validationMessage?: TContent;
  footer?: TContent;
}

export type TContent = string | JSX.Element;

export enum EStyle {
  INLINE_ROUNDED = "INLINE_ROUNDED",
}

export enum EColor {
  WHITE_BLACK = "WHITE_BLACK",
  WHITE_RED = "WHITE_RED",
  BLACK_WHITE = "BLACK_WHITE",
  ORANGE_WHITE = "ORANGE_WHITE",
  TRANSPARENT_WHITE = "TRANSPARENT_WHITE",
}

export class DynaFieldWrapper extends React.Component<IDynaFieldWrapperProps> {
  static defaultProps: IDynaFieldWrapperProps = {
    className: null,
    style: EStyle.INLINE_ROUNDED,
    color: EColor.WHITE_BLACK,
    label: null,
    required: null,
    isLoading: null,
    children: null,
    inputElementSelector: null,
    validationMessage: null,
    footer: null,
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
      if (!this.inputElement){
       console.error(`DynaFieldWrapper: the inputElementSelector is defined but doesn't return any input control, inputElementSelector: [${this.props.inputElementSelector}]`);
      }
      else {
        this.inputElement && this.inputElement.setAttribute('id', this.internalId);
      }
    }
  }

  private handleContainerClick(): void {
    const controlElement: HTMLInputElement = this.controlContainerElement.querySelector(this.props.inputElementSelector);
    if (controlElement) controlElement.focus();
  }

  public render(): JSX.Element {
    const {
      className: cn,
      style, color,
      label, required, isLoading,
      children,
      validationMessage, footer,
    } = this.props;

    const className: string = [
      cn || '',
      'dyna-ui-field-wrapper',
      `dyna-ui-field-wrapper-style-${style}`,
      `dyna-ui-field-wrapper-color-${color}`,
    ].join(' ').trim();

    return (
      <div className={className} onClick={this.handleContainerClick.bind(this)}>
        {label ? <div className="dyna-ui-label">
          <label htmlFor={this.internalId}>{label}</label>
        </div> : null}
        <div className="dyna-ui-field-wrapper-container">
          <div className="dyna-ui-field-wrapper-required">{required}</div>
          <div className="dyna-ui-field-wrapper-isLoading">{isLoading}</div>
          <div className="dyna-ui-field-wrapper-control-container" ref={element => this.controlContainerElement = element}>
            {children}
          </div>
          <div className="dyna-ui-field-wrapper-validation-message">{validationMessage}</div>
          <div className="dyna-ui-field-wrapper-footer">{footer}</div>
        </div>
      </div>
    );
  }
}
