/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Evennia from './evennia.js';


window.wsurl = 'wss://lorecraft.ngrok.io'
window.
window.Evennia.init()

AppRegistry.registerComponent(appName, () => App);
