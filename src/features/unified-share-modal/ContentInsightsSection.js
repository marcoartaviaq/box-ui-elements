// @flow

import React from 'react';
import noop from 'lodash/noop';
import { FormattedMessage } from 'react-intl';
import Toggle from '../../components/toggle';
import messages from './messages';
import { Checkbox } from '../../components';
import { ITEM_TYPE_FILE } from '../../common/constants';

import type { contentInsightsConfigType, Item } from './flowTypes';

type Props = {
    contentInsightsConfig?: contentInsightsConfigType,
    item: Item,
    onAdvancedInsightsEmailToggle: (isEnabled: boolean) => void,
    onAdvancedInsightsNotificationToggle: (isEnabled: boolean) => void,
    onAdvancedInsightsToggle: (isEnabled: boolean) => void,
    submitting: boolean,
};

export default function ContentInsightsSection({
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
    const toggleMessage = isActive ? messages.contentInsightsActive : messages.contentInsightsInactive;

    return (
        <div className="be">
            <div className="bdl-SharedLinkSection-separator" />

            <label>
                <span className="label bdl-Label">
                    <FormattedMessage {...messages.contentInsightsHeading} />
                </span>
            </label>

            <div className="shared-link-toggle-row">
                <div className="share-toggle-container">
                    <Toggle
                        isDisabled={submitting}
                        isOn={isActive}
                        label={<FormattedMessage {...toggleMessage} />}
                        onChange={() => onAdvancedInsightsToggle(!isActive)}
                    />
                </div>
            </div>

            {isActive && (
                <div className="shared-link-checkgroup-row">
                    <Checkbox
                        isChecked={requireEmail}
                        label={<FormattedMessage {...messages.contentInsightsRequireEmail} />}
                        name="require-email"
                        onChange={() => onAdvancedInsightsEmailToggle(!requireEmail)}
                    />
                    <Checkbox
                        isChecked={requireNotification}
                        label={<FormattedMessage {...messages.contentInsightsRequireNotify} />}
                        name="require-notify"
                        onChange={() => onAdvancedInsightsNotificationToggle(!requireNotification)}
                    />
                </div>
            )}
        </div>
    );
}
