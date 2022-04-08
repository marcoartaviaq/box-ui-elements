// @flow

import React from 'react';
import noop from 'lodash/noop';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { bdlGray50 } from '../../styles/variables';
import { Checkbox } from '../../components';
import DropdownMenu from '../../components/dropdown-menu';
import Gear from '../../icon/line/Gear16';
import IconInfo from '../../icons/general/IconInfo';
import { Menu, MenuItem } from '../../components/menu';
import PlainButton from '../../components/plain-button';
import Toggle from '../../components/toggle';
import Tooltip from '../../components/tooltip';
import { ITEM_TYPE_FILE } from '../../common/constants';

import type { contentInsightsConfigType, Item } from './flowTypes';

type Props = {
    checkgroupMode?: string,
    contentInsightsConfig?: contentInsightsConfigType,
    item: Item,
    onAdvancedInsightsEmailToggle: (isEnabled: boolean) => void,
    onAdvancedInsightsNotificationToggle: (isEnabled: boolean) => void,
    onAdvancedInsightsToggle: (isEnabled: boolean) => void,
    showTitle: boolean,
    submitting: boolean,
};

type CheckboxWrapperProps = {
    children: React.Node,
    wrapComponent: boolean,
};

const CheckboxWrapper = ({ wrapComponent, children }: CheckboxWrapperProps) =>
    wrapComponent ? <MenuItem>{children}</MenuItem> : children;

export default function ContentInsightsSection({
    checkgroupMode,
    contentInsightsConfig,
    item,
    onAdvancedInsightsEmailToggle = noop,
    onAdvancedInsightsNotificationToggle = noop,
    onAdvancedInsightsToggle = noop,
    submitting,
}: Props) {
    // TODO: Add extension/type checking, since we only support documents
    if (!contentInsightsConfig || item.type !== ITEM_TYPE_FILE) {
        return null;
    }

    const { isActive, requireEmail, requireNotification } = contentInsightsConfig;
    const showTooltip = checkgroupMode !== 'dropdown' || (checkgroupMode === 'dropdown' && isActive);
    const helpLink = !showTooltip
        ? {
              helpLink: (
                  <a href="https://support.box.com" rel="noopener noreferrer" target="_blank">
                      <FormattedMessage {...messages.learnMore} />
                  </a>
              ),
          }
        : { helpLink: '' };

    const toggleMessageDescription = (
        <FormattedMessage {...messages.contentInsightsActiveDescription} values={helpLink} />
    );

    const renderCheckboxes = wrapComponent => {
        return (
            <>
                <CheckboxWrapper wrapComponent={wrapComponent}>
                    <Checkbox
                        isChecked={requireEmail}
                        label={<FormattedMessage {...messages.contentInsightsRequireEmail} />}
                        name="require-email"
                        onChange={() => onAdvancedInsightsEmailToggle(!requireEmail)}
                        onClick={event => event.stopPropagation()}
                    />
                </CheckboxWrapper>
                <CheckboxWrapper wrapComponent={wrapComponent}>
                    <Checkbox
                        isChecked={requireNotification}
                        label={<FormattedMessage {...messages.contentInsightsRequireNotify} />}
                        name="require-notify"
                        onChange={() => onAdvancedInsightsNotificationToggle(!requireNotification)}
                        onClick={event => event.stopPropagation()}
                    />
                </CheckboxWrapper>
            </>
        );
    };

    return (
        <>
            <div className="be">
                {checkgroupMode !== 'dropdown' && <div className="bdl-SharedLinkSection-separator" />}
                <div className="shared-link-toggle-row">
                    <div className="ContentInsightsSection-toggle share-toggle-container">
                        <Toggle
                            isDisabled={submitting}
                            isOn={isActive}
                            label={<FormattedMessage {...messages.advancedInsights} />}
                            onChange={() => onAdvancedInsightsToggle(!isActive)}
                        />
                        {showTooltip && (
                            <Tooltip text={toggleMessageDescription}>
                                <span className="tooltip-icon-container" role="img">
                                    <IconInfo color={bdlGray50} height={14} width={14} />
                                </span>
                            </Tooltip>
                        )}
                    </div>
                </div>
                {isActive && !checkgroupMode && (
                    <div className="shared-link-checkgroup-row">{renderCheckboxes(false)}</div>
                )}
                {isActive && checkgroupMode === 'dropdown' && (
                    <DropdownMenu className="ContentInsightsSection-dropdownMenu" isRightAligned>
                        <PlainButton type="button">
                            <Gear />
                        </PlainButton>
                        <Menu>{renderCheckboxes(true)}</Menu>
                    </DropdownMenu>
                )}
            </div>
            {!showTooltip && <div className="ContentInsightsSection-description">{toggleMessageDescription}</div>}
        </>
    );
}
