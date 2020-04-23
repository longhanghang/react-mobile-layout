import { isPlatform } from './base';

/**
 * 初始化版本号
 */
function initBridge(successCallback) {
    if (isPlatform() === "web") {
        successCallback();
    } else if (isPlatform() === "android") {
        
        console.log("android 注入代码");
        androidBridge(); 
        connectWebViewJavascriptBridge(function(bridge) {
            window.YHAuthorize = bridge;
            window.YHAuthorize.init(function(message, responseCallback) {
                responseCallback();
            });

            initDatas(successCallback); // 初始化事件
        });
    } else if (isPlatform() === "ios") {
        console.log("iOS 注入代码");
        iosBridge(function(bridge) {
            window.YHAuthorize = bridge;
            initDatas(successCallback); // 初始化事件
        });
    }
}

// 初始化监听事件
function initDatas(successCallback) {
    // 初始化事件
    window.YHAuthorize.View = document.createElement("BUTTON");
    window.YHAuthorize.registerEvent = function(type, data) {
        let event = document.createEvent('Events');
        event.initEvent(type, false, false);
        if (data) {
            for (let i in data) {
                if (data.hasOwnProperty(i)) {
                    event[i] = data[i];
                }
            }
        }
        window.YHAuthorize.View.dispatchEvent(event);
    };
    successCallback();
}

/**
 * ios
 */
function iosBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
}

function androidBridge() {

    if (window.WebViewJavascriptBridge) {
        return;
    }
    var messagingIframe;
    var sendMessageQueue = [];
    var receiveMessageQueue = [];
    var messageHandlers = {};

    var CUSTOM_PROTOCOL_SCHEME = 'yy';
    var QUEUE_HAS_MESSAGE = '__QUEUE_MESSAGE__/';

    var responseCallbacks = {};
    var uniqueId = 1;

    function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
    }

    //set default messageHandler
    function init(messageHandler) {
        if (WebViewJavascriptBridge._messageHandler) {
            throw new Error('WebViewJavascriptBridge.init called twice');
        }
        WebViewJavascriptBridge._messageHandler = messageHandler;
        var receivedMessages = receiveMessageQueue;
        receiveMessageQueue = null;
        for (var i = 0; i < receivedMessages.length; i++) {
            _dispatchMessageFromNative(receivedMessages[i]);
        }
    }

    function send(data, responseCallback) {
        _doSend({
            data: data
        }, responseCallback);
    }

    function registerHandler(handlerName, handler) {
        messageHandlers[handlerName] = handler;
    }

    function callHandler(handlerName, data, responseCallback) {
        _doSend({
            handlerName: handlerName,
            data: data
        }, responseCallback);
    }

    //sendMessage add message, 触发native处理 sendMessage
    function _doSend(message, responseCallback) {
        if (responseCallback) {
            let _tempRandom = Math.round(Math.random() * 1000000);
            var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime() + _tempRandom;
            responseCallbacks[callbackId] = responseCallback;
            message.callbackId = callbackId;
        }
        sendMessageQueue.push(message);
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
    }

    // 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url shouldOverrideUrlLoading 的方式返回内容
    function _fetchQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        //android can't read directly the return data, so we can reload iframe src to communicate with java
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://return/_fetchQueue/' + encodeURIComponent(messageQueueString);
    }

    //提供给native使用,
    function _dispatchMessageFromNative(messageJSON) {
        setTimeout(function() {
            var message = JSON.parse(messageJSON);
            var responseCallback;
            //java call finished, now need to call js callback function
            if (message.responseId) {
                responseCallback = responseCallbacks[message.responseId];
                if (!responseCallback) {
                    return;
                }
                responseCallback(JSON.parse(message.responseData));
                delete responseCallbacks[message.responseId];
            } else {
                //直接发送
                if (message.callbackId) {
                    var callbackResponseId = message.callbackId;
                    responseCallback = function(responseData) {
                        _doSend({
                            responseId: callbackResponseId,
                            responseData: responseData
                        });
                    };
                }

                var handler = WebViewJavascriptBridge._messageHandler;
                if (message.handlerName) {
                    handler = messageHandlers[message.handlerName];
                }
                //查找指定handler
                try {
                    handler(message.data, responseCallback);
                } catch (exception) {
                    if (typeof console != 'undefined') {
                        console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception);
                    }
                }
            }
        });
    }

    //提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null,所以
    function _handleMessageFromNative(messageJSON) {
        //  console.log(messageJSON);
        if (receiveMessageQueue && receiveMessageQueue.length > 0) {
            receiveMessageQueue.push(messageJSON);
        } else {
            _dispatchMessageFromNative(messageJSON);
        }
    }

    var WebViewJavascriptBridge = window.WebViewJavascriptBridge = {
        init: init,
        send: send,
        registerHandler: registerHandler,
        callHandler: callHandler,
        _fetchQueue: _fetchQueue,
        _handleMessageFromNative: _handleMessageFromNative
    };

    var doc = document;
    _createQueueReadyIframe(doc);
    var readyEvent = doc.createEvent('Events');
    readyEvent.initEvent('WebViewJavascriptBridgeReady');
    readyEvent.bridge = WebViewJavascriptBridge;
    doc.dispatchEvent(readyEvent);
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        console.log("有桥")
        callback(window.WebViewJavascriptBridge)
    } else {
        console.log("没桥")
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(window.WebViewJavascriptBridge)
        }, false);
    }
};
export { initBridge };