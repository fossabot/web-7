import classnames from 'classnames';
import React from 'react';
import type { ComponentProps, Merge } from '../../utils/types';
import UnstyledTextInput from './_UnstyledTextInput';
import TextInputWrapper from './_TextInputWrapper';

type NonPassthroughProps = {
  className?: string;
  leadingVisual?: string | React.ComponentType<{ className?: string }>;
  trailingVisual?: string | React.ComponentType<{ className?: string }>;
} & Pick<
  ComponentProps<typeof TextInputWrapper>,
  'block' | 'contrast' | 'disabled' | 'size'
>;

// Note: using ComponentProps instead of ComponentPropsWithoutRef here would cause a type issue where `css` is a required prop.
type TextInputInternalProps = Merge<
  React.ComponentPropsWithoutRef<typeof UnstyledTextInput>,
  NonPassthroughProps
>;

// using forwardRef is important so that other components (ex. SelectMenu) can autofocus the input
const TextInput = React.forwardRef<HTMLInputElement, TextInputInternalProps>(
  (
    {
      leadingVisual: LeadingVisual,
      trailingVisual: TrailingVisual,
      block,
      className,
      contrast,
      disabled,
      validationStatus,
      size: sizeProp,
      ...inputProps
    },
    ref,
  ) => {
    // this class is necessary to style FilterSearch, plz no touchy!
    const wrapperClasses = classnames(className, 'TextInput-wrapper');

    return (
      <TextInputWrapper
        block={block}
        className={wrapperClasses}
        validationStatus={validationStatus}
        contrast={contrast}
        disabled={disabled}
        size={sizeProp}
        hasLeadingVisual={Boolean(LeadingVisual)}
        hasTrailingVisual={Boolean(TrailingVisual)}>
        {LeadingVisual && (
          <span className='TextInput-icon'>
            {typeof LeadingVisual === 'function' ? (
              <LeadingVisual />
            ) : (
              LeadingVisual
            )}
          </span>
        )}
        <UnstyledTextInput
          ref={ref}
          disabled={disabled}
          {...inputProps}
          data-component='input'
        />
        {TrailingVisual && (
          <span className='TextInput-icon'>
            {typeof TrailingVisual === 'function' ? (
              <TrailingVisual />
            ) : (
              TrailingVisual
            )}
          </span>
        )}
      </TextInputWrapper>
    );
  },
);

TextInput.defaultProps = {
  type: 'text',
};

TextInput.displayName = 'TextInput';

export type TextInputProps = ComponentProps<typeof TextInput>;
export default TextInput;
