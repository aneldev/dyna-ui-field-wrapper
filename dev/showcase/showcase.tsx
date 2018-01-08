import * as React from 'react';
import {DynaFieldWrapper, EColor, EStyle, IDynaFieldWrapperProps} from "../../src";

import {faIcon, IShowcase} from "dyna-showcase";
import {Logo} from "../logo";

require('./showcase.less');

export default {
  logo: <Logo />,
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
      slug: 'sizes',
      faIconName: 'flask',
      title: 'rounded',
      center: true,
      component: (
        <DynaFieldWrapper
          label={<span>{faIcon('user')} User name</span>}
          inputElementSelector=".input-control"
        >
          <input className="input-control" style={{width:"100%"}} value="John" onChange={(e)=>console.log('changed',e.target.value)}/>
        </DynaFieldWrapper>
      ),
      wrapperStyle:{
        width: "100%",
        backgroundColor:"grey",
        padding: "20px",
      },
      props: [
        {
          slug: 'inline-rounded-white-black',
          title: 'Inline rounded - White/Black',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.WHITE_BLACK,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-white-black-no-label',
          title: 'Inline rounded - White/Black without label',
          props: {
            label: null,
            style: EStyle.INLINE_ROUNDED,
            color: EColor.WHITE_BLACK,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-white-black-validation-message',
          title: 'Inline rounded - White/Black and validation message',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.WHITE_BLACK,
            validationMessage: <span>{faIcon('exclamation-circle')} user name is required</span>,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-white-black-validation-message-isloading',
          title: 'Inline rounded - White/Black and validation message and is loading',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.WHITE_BLACK,
            isLoading: faIcon('spinner fa-spin fa-3x fa-fw'),
            validationMessage: <span>{faIcon('exclamation-circle')} user name is required</span>,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-white-black-required',
          title: 'Inline rounded - White/Black and required test',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.WHITE_BLACK,
            required: <span>{faIcon('info-circle')} <i>required</i></span>,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-white-red',
          title: 'Inline rounded - White/Red',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.WHITE_RED,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-black-white',
          title: 'Inline rounded - Black/White',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.BLACK_WHITE,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-transparent-white',
          title: 'Inline rounded - Transparent/White',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.TRANSPARENT_WHITE,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-orange-white',
          title: 'Inline rounded - Orange/White',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.ORANGE_WHITE,
          } as IDynaFieldWrapperProps
        },
        {
          slug: 'inline-rounded-black-white-custom-footer',
          title: 'Inline rounded - Black/White with custom footer',
          props: {
            style: EStyle.INLINE_ROUNDED,
            color: EColor.BLACK_WHITE,
            footer: (
              <div
              style={{border:"1px solid gray", position: "absolute", backgroundColor:"white", padding: "20px 4px"}}
              >custom footer, floated</div>
            )
          } as IDynaFieldWrapperProps
        },
      ]
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
