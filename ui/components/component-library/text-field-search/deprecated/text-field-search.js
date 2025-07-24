import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  ButtonIcon,
  ButtonIconSize,
  Icon,
  IconName,
  IconSize,
} from '../..';
import { useI18nContext } from '../../../../hooks/useI18nContext';

export const TextFieldSearch = ({
  className = '',
  showClearButton = true, 
  clearButtonOnClick, 
  clearButtonProps = {}, 
  endAccessory: _endAccessory, 
  inputProps: _inputProps, 
  value, 
 onChange, ...props
}) => {
    const t = useI18nContext();
    return (
        <TextField
            className={classnames('mm-text-field-search', className)}
            value={value}
            onChange={onChange}
            type="search"
            endAccessory={
                value && showClearButton ? (
                    <>
                        <ButtonIcon
                            className="mm-text-field__button-clear"
                            ariaLabel={t('clear')}
                            iconName={IconName.Close}
                            size={ButtonIconSize.Sm}
                            onClick={(clearButtonOnClick && clearButtonOnClick) || undefined}
                        />
                        {_endAccessory}
                    </>
                ) : (
                    _endAccessory
                )
            }
            startAccessory={
                <Icon padding={1} name={IconName.Search} size={IconSize.Sm} />
            }
            inputProps={{
                ...(typeof _inputProps === 'object' ? _inputProps : {})
              }}
              {...props}>
          </TextField>
      );
};

TextFieldSearch.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool,
    clearButtonOnClick: (props) => {
        if (props.showClearButton && !props.clearButtonOnClick) {
          return new Error(
              `clearButtonClick is required unless showClearButon is false. Warning coming from TextFieldSearch ui/components/component-library/text-field-search/text-field-search.js`,
          );
        }
        return null;
      },
      clearButtonProps: PropTypes.object,
      className: PropTypes.string,
      endAccessory: PropTypes.node,

};
TextFieldSearch.displayName='TextFieldSearch';
