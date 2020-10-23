import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import pluginId from '../../pluginId';

const SettingPage1 = () => (
    <div>
        <h1>Setting Page 1</h1>
    </div>
);
const SettingPage2 = () => (
    <div>
        <h1>Setting Page 2</h1>
    </div>
);

const Settings = ({ settingsBaseURL }) => {
    return (
        <Switch>
            <Route component={SettingPage1} path={`${settingsBaseURL}/${pluginId}/setting1`} />
            <Route component={SettingPage2} path={`${settingsBaseURL}/${pluginId}/setting2`} />
        </Switch>
    );
};

Settings.propTypes = {
    settingsBaseURL: PropTypes.string.isRequired,
};

export default Settings;