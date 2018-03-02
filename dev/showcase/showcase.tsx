import * as React from 'react';
import {DynaPickerContainer} from "dyna-ui-picker-container";

import {DynaFieldWrapper, EColor, EMode, ESize, EStyle, IDynaFieldWrapperProps, TContent} from "../../src";

import {faIcon, IShowcase} from "dyna-showcase";
import {Logo} from "../logo";
import {findRenderedDOMComponentWithClass} from "react-dom/test-utils";

require('./showcase.less');

export default {
  logo: <Logo/>,
  views: [

    {
      slug: 'intro',
      faIconName: 'circle-o-notch',
      title: 'Introduction',
      center: true,
      component: (
        <div>
          <h3>DynaInput</h3>
          <h4>plain react input</h4>
          <p>nothing more</p>
        </div>
      ),
    },

    {
      slug: 'colours',
      faIconName: 'flask',
      title: 'rounded',
      center: true,
      component: (() => {

        interface IMyAppProps {
          style?: EStyle;
          isLoading?: TContent,
          validationMessage?: TContent,
        }

        class MyApp extends React.Component<IMyAppProps> {
          private renderColor(color: EColor): JSX.Element {
            const {style, isLoading, validationMessage} = this.props;

            return (
              <div>
                <h2>color: {color}</h2>
                <h4>edit mode</h4>
                <DynaFieldWrapper
                  mode={EMode.EDIT}
                  color={color}
                  style={style}
                  isLoading={isLoading}
                  validationMessage={validationMessage}
                  label={<span>{faIcon('user')} User name</span>}
                  inputElementSelector=".input-control"
                  onFocus={() => console.log('on focus')}
                >
                  <input className="input-control" style={{width: "100%"}} value="John" onChange={(e) => console.log('changed', e.target.value)}/>
                </DynaFieldWrapper>
                <h4>view mode</h4>
                <DynaFieldWrapper
                  mode={EMode.VIEW}
                  color={color}
                  style={style}
                  isLoading={isLoading}
                  validationMessage={validationMessage}
                  label={<span>{faIcon('user')} User name</span>}
                  inputElementSelector=".input-control"
                  onFocus={() => console.log('on focus')}
                >
                  <input className="input-control" style={{width: "100%"}} value="John" onChange={(e) => console.log('changed', e.target.value)}/>
                </DynaFieldWrapper>

              </div>
            )
          }

          public render(): JSX.Element[] {
            return Object.keys(EColor).map((color: EColor) => this.renderColor(color));
          }
        }

        return <MyApp/>

      })(),
      wrapperStyle: {
        width: "100%",
        padding: "20px",
        overflowY: "auto",
      },
      props: [
        {
          slug: 'simple-field',
          title: 'Simple field demo',
          props: {
            label: <span>{faIcon('plane')} Destination</span>,
            style: EStyle.INLINE_ROUNDED,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'field-validation-is-loading',
          title: 'Field with validation, is required and is loading',
          props: {
            label: <span>{faIcon('plane')} Destination</span>,
            style: EStyle.INLINE_ROUNDED,
            isLoading: faIcon('spinner fa-spin fa-3x fa-fw'),
            required: <span>{faIcon('info-circle')} <i>required</i></span>,
            validationMessage: <span>{faIcon('exclamation-circle')} user name is required</span>,
          } as IDynaFieldWrapperProps
        },
      ]
    },

    {
      slug: 'sizes',
      title: 'sizes',
      center: true,
      component: (
        <DynaFieldWrapper
          label={<span>{faIcon('user')} User name</span>}
          inputElementSelector=".input-control"
        >
          <input className="input-control" style={{width: "100%"}} value="John" onChange={(e) => console.log('changed', e.target.value)}/>
        </DynaFieldWrapper>
      ),
      props: Object.keys(ESize).map((size: ESize) => {
        return ({
          slug: `size-${size}`,
          title: `${size} - Orange/White and validation message and is loading`,
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.ORANGE_WHITE,
            size,
          } as IDynaFieldWrapperProps
        })
      }),
    },

    {
      slug: 'sizes-with-app-notifications',
      title: 'sizes with validation, required and is loading',
      center: true,
      component: (
        <DynaFieldWrapper
          label={<span>{faIcon('user')} User name</span>}
          inputElementSelector=".input-control"
        >
          <input className="input-control" style={{width: "100%"}} value="John" onChange={(e) => console.log('changed', e.target.value)}/>
        </DynaFieldWrapper>
      ),
      props: Object.keys(ESize).map((size: ESize) => {
        return ({
          slug: `size-${size}`,
          title: `${size} - Orange/White and validation message and is loading`,
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.ORANGE_WHITE,
            size,
            isLoading: faIcon('spinner fa-spin fa-3x fa-fw'),
            required: <span>{faIcon('info-circle')} <i>required</i></span>,
            validationMessage: <span>{faIcon('exclamation-circle')} user name is required</span>,
          } as IDynaFieldWrapperProps
        })
      }),
    },

    {
      slug: 'picker-container',
      title: 'Dyna ui picker container',
      description: 'Demonstrate how the events are working with pickers',
      center: true,
      component: (() => {
        interface IMyAppProps {
        }

        interface IMyAppState {
          pop: boolean;
          text: string;
        }

        class MyApp extends React.Component<IMyAppProps, IMyAppState> {
          constructor(props: IMyAppProps) {
            super(props);
            this.state = {
              pop: false,
              text: '',
            }
          }

          // vanilla events

          private handleValueChange(event: any): void {
            this.setState({text: event.target.value});
          }

          private handleTodayClick(event: Event): void {
            this.setState({text: (new Date).toDateString()});
            console.log('today click');
          }

          private handleClosePicker(): void {
            this.setState({pop: false})
          }

          // handle the click bdsm events

          private handleFieldWrapperClick(): void {
            console.log('general inside click');
            this.setState({pop: !this.state.pop});
          }

          private handleFieldWrapperOutsideClick(): void {
            console.log('general outside click');
            this.setState({pop: false});
          }

          private handlePickerContainerClick(event: Event): void {
            // block the events otherwise the handleFieldWrapperClick will close it
            event.preventDefault();
            event.stopPropagation();
          }

          public render(): JSX.Element {
            const {} = this.props;
            const {pop, text} = this.state;
            return (
              <DynaFieldWrapper
                label="Name"
                onClick={this.handleFieldWrapperClick.bind(this)}
                onOutsideClick={this.handleFieldWrapperOutsideClick.bind(this)}
                footer={
                  <DynaPickerContainer
                    show={pop}
                  >
                    <div onClick={this.handlePickerContainerClick.bind(this)}>
                      <h1>it's me</h1>
                      <h4>the picker container</h4>
                      <p>This picker closes only with the close button</p>
                      <p>or clicking outside of the control.</p>
                      <button onClick={this.handleTodayClick.bind(this)}>today</button>
                      <button onClick={this.handleClosePicker.bind(this)}>close</button>
                    </div>
                  </DynaPickerContainer>
                }
              >
                <input value={text} onChange={this.handleValueChange.bind(this)}/>
              </DynaFieldWrapper>
            );
          }
        }

        return <MyApp/>;
      })()
    },

    {
      slug: 'the-end',
      title: 'the end',
      description: 'Thank you',
      center: true,
      component: (
        <div style={{textAlign: 'center'}}>
          <h1>The end</h1>
          <div style={{fontSize: '20px'}}>
            <p><a href="https://github.com/aneldev/dyna-ui-field-wrapper">{faIcon('github')} Github</a></p>
            <p><a href="https://www.npmjs.com/package/dyna-ui-field-wrapper">{faIcon('square')} npm</a></p>
          </div>
        </div>
      ),
    },

  ]
}as IShowcase;
