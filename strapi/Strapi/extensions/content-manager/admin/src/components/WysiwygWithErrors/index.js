/**
 *
 * WysiwygWithErrors
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isFunction } from 'lodash';
import cn from 'classnames';

import { Description, ErrorMessage, Label } from '@buffetjs/styles';
import { Error } from '@buffetjs/core';

import Wysiwyg from '../Wysiwyg';
import Wrapper from './Wrapper';
// import Editor from "../CKEditor";
// import Jodit from "./Jodit"

// eslint-disable-next-line react/prefer-stateless-function
class WysiwygWithErrors extends React.Component {

    render() {
        const {
            autoFocus,
            className,
            deactivateErrorHighlight,
            disabled,
            error: inputError,
            inputClassName,
            inputDescription,
            inputStyle,
            label,
            name,
            onBlur: handleBlur,
            onChange,
            placeholder,
            resetProps,
            style,
            tabIndex,
            validations,
            value,
            ...rest
        } = this.props;


        return (
            <Error inputError={inputError} name={name} type="text" validations={validations}>
                {({ canCheck, onBlur, error, dispatch }) => {
                    const hasError = Boolean(error);

                    let change = (e) => {

                        if (!canCheck) {
                            dispatch({
                                type: 'SET_CHECK',
                            });
                        }

                        dispatch({
                            type: 'SET_ERROR',
                            error: null,
                        });
                        onChange(e);
                    };

                    return (
                        <Wrapper
                            className={`${cn(!isEmpty(className) && className)} ${hasError ? 'bordered' : ''}`}
                            style={style}
                        >
                            <Label htmlFor={name}>{label}</Label>
                            {/* <Editor name={name} onChange={change} value={value} /> */}
                            <Wysiwyg
                                {...rest}
                                autoFocus={autoFocus}
                                className={inputClassName}
                                disabled={disabled}
                                deactivateErrorHighlight={deactivateErrorHighlight}
                                error={hasError}
                                name={name}
                                onBlur={isFunction(handleBlur) ? handleBlur : onBlur}
                                onChange={change}
                                placeholder={placeholder}
                                resetProps={resetProps}
                                style={inputStyle}
                                tabIndex={tabIndex}
                                value={value}
                            />
                            {!hasError && inputDescription && <Description>{inputDescription}</Description>}
                            {hasError && <ErrorMessage>{error}</ErrorMessage>}
                        </Wrapper>
                    );
                }}
            </Error>
        );
    }
}

WysiwygWithErrors.defaultProps = {
    autoFocus: false,
    className: '',
    deactivateErrorHighlight: false,
    didCheckErrors: false,
    disabled: false,
    error: null,
    inputClassName: '',
    inputDescription: '',
    inputStyle: {},
    label: '',
    onBlur: false,
    placeholder: '',
    resetProps: false,
    style: {},
    tabIndex: '0',
    validations: {},
    value: null,
};

WysiwygWithErrors.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    deactivateErrorHighlight: PropTypes.bool,
    didCheckErrors: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    inputClassName: PropTypes.string,
    inputDescription: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.shape({
            id: PropTypes.string,
            params: PropTypes.object,
        }),
    ]),
    inputStyle: PropTypes.object,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.shape({
            id: PropTypes.string,
            params: PropTypes.object,
        }),
    ]),
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    resetProps: PropTypes.bool,
    style: PropTypes.object,
    tabIndex: PropTypes.string,
    validations: PropTypes.object,
    value: PropTypes.string,
};

export default WysiwygWithErrors;
