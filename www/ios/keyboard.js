/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var Keyboard = function () {};

Keyboard.fireOnShow = function (height) {
    Keyboard.setVariableState("open");
    Keyboard.isVisible = true;

    cordova.fireWindowEvent('keyboardDidShow', {
        'keyboardHeight': height
    });

    // To support the keyboardAttach directive listening events
    // inside Ionic's main bundle
    cordova.fireWindowEvent('native.keyboardshow', {
        'keyboardHeight': height
    });
};

Keyboard.fireOnHide = function () {
    Keyboard.setVariableState("close");

    Keyboard.isVisible = false;
    cordova.fireWindowEvent('keyboardDidHide');

    // To support the keyboardAttach directive listening events
    // inside Ionic's main bundle
    cordova.fireWindowEvent('native.keyboardhide');
};

Keyboard.fireOnHiding = function () {
    Keyboard.setVariableState("closing");

    cordova.fireWindowEvent('keyboardWillHide');
};

Keyboard.fireOnShowing = function (height) {
    Keyboard.setVariableState("opening");

    cordova.fireWindowEvent('keyboardWillShow', {
        'keyboardHeight': height
    });
};

Keyboard.setVariableState = function(s) {
    var html = window.parent.document.documentElement;
    html.style.setProperty('--kb-keyboard-open', s == 'open' ? 1 : 0);
    html.style.setProperty('--kb-keyboard-close', s == 'close' ? 1 : 0);
    html.style.setProperty('--kb-keyboard-opening', s == 'opening' ? 1 : 0);
    html.style.setProperty('--kb-keyboard-closing', s == 'closing' ? 1 : 0);
}

Keyboard.fireOnResize = function (height, screenHeight, ele) {
    var spaceAvailable = (height === 0) ? null : (screenHeight - height) + 'px';
    
    var html = window.parent.document.documentElement;
    html.style.setProperty('--kb-space-available', spaceAvailable);
    html.style.setProperty('--kb-toolbar-bottom', height === 0 ? null : height + 'px');

    if (ele) {
        ele.style.height = spaceAvailable;
    }
};

Keyboard.hideFormAccessoryBar = function (hide, success) {
    if (hide !== null && hide !== undefined) {
        exec(success, null, "Keyboard", "hideFormAccessoryBar", [hide]);
    } else {
        exec(success, null, "Keyboard", "hideFormAccessoryBar", []);
    }
};

Keyboard.hide = function () {
    exec(null, null, "Keyboard", "hide", []);
};

Keyboard.show = function () {
    console.warn('Showing keyboard not supported in iOS due to platform limitations.');
    console.warn('Instead, use input.focus(), and ensure that you have the following setting in your config.xml: \n');
    console.warn('    <preference name="KeyboardDisplayRequiresUserAction" value="false"/>\n');
};

Keyboard.disableScroll = function (disable) {
    console.warn("Keyboard.disableScroll() was removed");
};

Keyboard.setResizeMode = function (mode) {
    exec(null, null, "Keyboard", "setResizeMode", [mode]);
}

Keyboard.isVisible = false;

module.exports = Keyboard;