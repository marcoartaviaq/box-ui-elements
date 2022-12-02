import React from 'react';
import noop from 'lodash/noop';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import InfoBadge16 from '../../icon/fill/InfoBadge16';
// @ts-ignore flow import
import Toggle from '../../components/toggle';
import Tooltip from '../../components/tooltip';
import './AdvancedContentInsightsToggle.scss';

interface Props {
    hasDescriptionInTooltip?: boolean;
    isActive: boolean;
    isDisabled: boolean;
    onChange?: (isEnabled: boolean) => void;
}

const AdvancedContentInsightsToggle = ({
    hasDescriptionInTooltip = true,
    isActive = false,
    isDisabled,
    onChange = noop,
}: Props) => {
    const helpLink = !hasDescriptionInTooltip && (
        <a href="https://support.box.com" rel="noopener noreferrer" target="_blank">
            <FormattedMessage {...messages.learnMore} />
        </a>
    );

    const description = <FormattedMessage {...messages.advancedContentInsightsDescription} values={{ helpLink }} />;
    const label = (
        <>
            <FormattedMessage {...messages.advancedContentInsightsTitle} />
            {hasDescriptionInTooltip && (
                <Tooltip text={description}>
                    <div className="AdvancedContentInsightsToggle-icon">
                        <InfoBadge16 height={14} width={14} />
                    </div>
                </Tooltip>
            )}
        </>
    );

    return (
        <div className="AdvancedContentInsightsToggle">
            <Toggle
                data-testid="insights-toggle"
                description={!hasDescriptionInTooltip && description}
                isDisabled={isDisabled}
                isOn={isActive}
                label={label}
                onChange={() => onChange(!isActive)}
            />
        </div>
    );
};

export default AdvancedContentInsightsToggle;