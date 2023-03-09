(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/BenefitsClaim/i18n/i18n.properties":
/*!**************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/i18n/i18n.properties ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/AppUpdateFailure.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/AppUpdateFailure.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/BenefitsClaim/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/AppUpdateSuccess.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/AppUpdateSuccess.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/BenefitsClaim/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/BenefitsClaim/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_Cancel.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Claims/Claims_Cancel.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Claims')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Claims'
                },
                'OnSuccess': '/BenefitsClaim/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_CreateEntity.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Claims/Claims_CreateEntity.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Claims')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/Claims/Claims_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/BenefitsClaim/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Claims',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/Claims/Claims_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_CreateReceipts.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Claims/Claims_CreateReceipts.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    let readLink = clientAPI.binding['@odata.readLink'];
    return clientAPI.executeAction({
        'Name': '/BenefitsClaim/Actions/Claims/Claims_CreateReceipts.action',
        'Properties': {
            'OnSuccess': ''
        }
    }).then((result) => {
        let newEntity = JSON.parse(result.data);
        if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Claims')) {
            return clientAPI.executeAction({
                'Name': '/BenefitsClaim/Actions/Receipts/Receipts_UploadStream.action',
                'Properties': {
                    'Target': {
                        'ReadLink': newEntity['@odata.readLink']
                    },
                    'OnSuccess': ''
                }
            }).then((result) => {
                return clientAPI.executeAction({
                    'Name': '/BenefitsClaim/Actions/DraftSaveEntity.action',
                    'Properties': {
                        'Target': {
                            'EntitySet': 'Claims',
                            'ReadLink': readLink
                        }
                    }
                });
            });
        } else {
            return clientAPI.executeAction({
                'Name': '/BenefitsClaim/Actions/Receipts/Receipts_UploadStream.action',
                'Properties': {
                    'Target': {
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_DeleteConfirmation.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Claims/Claims_DeleteConfirmation.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/BenefitsClaim/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/BenefitsClaim/Actions/Claims/Claims_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_UpdateEntity.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Claims/Claims_UpdateEntity.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Claims')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/Claims/Claims_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/BenefitsClaim/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Claims'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/Claims/Claims_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Claims/NavToClaims_CreateReceipts.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Claims/NavToClaims_CreateReceipts.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Claims')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Claims'
                },
                'OnSuccess': '/BenefitsClaim/Actions/Claims/NavToClaims_CreateReceipts.action'
            }
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/Claims/NavToClaims_CreateReceipts.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Claims/NavToClaims_Edit.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Claims/NavToClaims_Edit.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Claims')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Claims'
                },
                'OnSuccess': '/BenefitsClaim/Actions/Claims/NavToClaims_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/Claims/NavToClaims_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/OnWillUpdate.js":
/*!***************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/OnWillUpdate.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/BenefitsClaim/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Receipts/NavToReceipts_Edit.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Receipts/NavToReceipts_Edit.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Receipts')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Receipts'
                },
                'OnSuccess': '/BenefitsClaim/Actions/Receipts/NavToReceipts_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/Receipts/NavToReceipts_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_Cancel.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_Cancel.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Receipts')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Receipts'
                },
                'OnSuccess': '/BenefitsClaim/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_DeleteConfirmation.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_DeleteConfirmation.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/BenefitsClaim/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/BenefitsClaim/Actions/Receipts/Receipts_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_UpdateEntity.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_UpdateEntity.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/BenefitsClaim/Services/service1.service').isDraftEnabled('Receipts')) {
        return clientAPI.executeAction({
            'Name': '/BenefitsClaim/Actions/Receipts/Receipts_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/BenefitsClaim/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Receipts'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/BenefitsClaim/Actions/Receipts/Receipts_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Rules/ResetAppSettingsAndLogout.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Rules/ResetAppSettingsAndLogout.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/BenefitsClaim/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Styles/Styles.json":
/*!************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Styles/Styles.json ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/BenefitsClaim/jsconfig.json":
/*!*******************************************************!*\
  !*** ./build.definitions/BenefitsClaim/jsconfig.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let benefitsclaim_actions_appupdate_action = __webpack_require__(/*! ./BenefitsClaim/Actions/AppUpdate.action */ "./build.definitions/BenefitsClaim/Actions/AppUpdate.action")
let benefitsclaim_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/AppUpdateFailureMessage.action */ "./build.definitions/BenefitsClaim/Actions/AppUpdateFailureMessage.action")
let benefitsclaim_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./BenefitsClaim/Actions/AppUpdateProgressBanner.action */ "./build.definitions/BenefitsClaim/Actions/AppUpdateProgressBanner.action")
let benefitsclaim_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/BenefitsClaim/Actions/AppUpdateSuccessMessage.action")
let benefitsclaim_actions_claims_claims_createentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/Claims_CreateEntity.action */ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_CreateEntity.action")
let benefitsclaim_actions_claims_claims_createreceipts_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/Claims_CreateReceipts.action */ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_CreateReceipts.action")
let benefitsclaim_actions_claims_claims_deleteentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/Claims_DeleteEntity.action */ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_DeleteEntity.action")
let benefitsclaim_actions_claims_claims_detailpopover_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/Claims_DetailPopover.action */ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_DetailPopover.action")
let benefitsclaim_actions_claims_claims_updateentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/Claims_UpdateEntity.action */ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_UpdateEntity.action")
let benefitsclaim_actions_claims_navtoclaims_create_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/NavToClaims_Create.action */ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Create.action")
let benefitsclaim_actions_claims_navtoclaims_createreceipts_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/NavToClaims_CreateReceipts.action */ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_CreateReceipts.action")
let benefitsclaim_actions_claims_navtoclaims_detail_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/NavToClaims_Detail.action */ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Detail.action")
let benefitsclaim_actions_claims_navtoclaims_edit_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/NavToClaims_Edit.action */ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Edit.action")
let benefitsclaim_actions_claims_navtoclaims_list_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Claims/NavToClaims_List.action */ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_List.action")
let benefitsclaim_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./BenefitsClaim/Actions/CloseModalPage_Cancel.action */ "./build.definitions/BenefitsClaim/Actions/CloseModalPage_Cancel.action")
let benefitsclaim_actions_closemodalpage_complete_action = __webpack_require__(/*! ./BenefitsClaim/Actions/CloseModalPage_Complete.action */ "./build.definitions/BenefitsClaim/Actions/CloseModalPage_Complete.action")
let benefitsclaim_actions_closepage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/ClosePage.action */ "./build.definitions/BenefitsClaim/Actions/ClosePage.action")
let benefitsclaim_actions_createentityfailuremessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/CreateEntityFailureMessage.action */ "./build.definitions/BenefitsClaim/Actions/CreateEntityFailureMessage.action")
let benefitsclaim_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/BenefitsClaim/Actions/CreateEntitySuccessMessage.action")
let benefitsclaim_actions_deleteconfirmation_action = __webpack_require__(/*! ./BenefitsClaim/Actions/DeleteConfirmation.action */ "./build.definitions/BenefitsClaim/Actions/DeleteConfirmation.action")
let benefitsclaim_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/BenefitsClaim/Actions/DeleteEntityFailureMessage.action")
let benefitsclaim_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/BenefitsClaim/Actions/DeleteEntitySuccessMessage.action")
let benefitsclaim_actions_draftdiscardentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/DraftDiscardEntity.action */ "./build.definitions/BenefitsClaim/Actions/DraftDiscardEntity.action")
let benefitsclaim_actions_drafteditentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/DraftEditEntity.action */ "./build.definitions/BenefitsClaim/Actions/DraftEditEntity.action")
let benefitsclaim_actions_draftsaveentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/DraftSaveEntity.action */ "./build.definitions/BenefitsClaim/Actions/DraftSaveEntity.action")
let benefitsclaim_actions_logout_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Logout.action */ "./build.definitions/BenefitsClaim/Actions/Logout.action")
let benefitsclaim_actions_logoutmessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/LogoutMessage.action */ "./build.definitions/BenefitsClaim/Actions/LogoutMessage.action")
let benefitsclaim_actions_onwillupdate_action = __webpack_require__(/*! ./BenefitsClaim/Actions/OnWillUpdate.action */ "./build.definitions/BenefitsClaim/Actions/OnWillUpdate.action")
let benefitsclaim_actions_receipts_navtoreceipts_detail_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Receipts/NavToReceipts_Detail.action */ "./build.definitions/BenefitsClaim/Actions/Receipts/NavToReceipts_Detail.action")
let benefitsclaim_actions_receipts_navtoreceipts_edit_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Receipts/NavToReceipts_Edit.action */ "./build.definitions/BenefitsClaim/Actions/Receipts/NavToReceipts_Edit.action")
let benefitsclaim_actions_receipts_receipts_deleteentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Receipts/Receipts_DeleteEntity.action */ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_DeleteEntity.action")
let benefitsclaim_actions_receipts_receipts_detailpopover_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Receipts/Receipts_DetailPopover.action */ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_DetailPopover.action")
let benefitsclaim_actions_receipts_receipts_opendocument_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Receipts/Receipts_OpenDocument.action */ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_OpenDocument.action")
let benefitsclaim_actions_receipts_receipts_updateentity_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Receipts/Receipts_UpdateEntity.action */ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_UpdateEntity.action")
let benefitsclaim_actions_receipts_receipts_uploadstream_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Receipts/Receipts_UploadStream.action */ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_UploadStream.action")
let benefitsclaim_actions_service_initializeonline_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Service/InitializeOnline.action */ "./build.definitions/BenefitsClaim/Actions/Service/InitializeOnline.action")
let benefitsclaim_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/BenefitsClaim/Actions/Service/InitializeOnlineFailureMessage.action")
let benefitsclaim_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/BenefitsClaim/Actions/Service/InitializeOnlineSuccessMessage.action")
let benefitsclaim_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/BenefitsClaim/Actions/UpdateEntityFailureMessage.action")
let benefitsclaim_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action")
let benefitsclaim_actions_uploadstreamfailuremessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/UploadStreamFailureMessage.action */ "./build.definitions/BenefitsClaim/Actions/UploadStreamFailureMessage.action")
let benefitsclaim_actions_uploadstreamsuccessmessage_action = __webpack_require__(/*! ./BenefitsClaim/Actions/UploadStreamSuccessMessage.action */ "./build.definitions/BenefitsClaim/Actions/UploadStreamSuccessMessage.action")
let benefitsclaim_globals_appdefinition_version_global = __webpack_require__(/*! ./BenefitsClaim/Globals/AppDefinition_Version.global */ "./build.definitions/BenefitsClaim/Globals/AppDefinition_Version.global")
let benefitsclaim_i18n_i18n_properties = __webpack_require__(/*! ./BenefitsClaim/i18n/i18n.properties */ "./build.definitions/BenefitsClaim/i18n/i18n.properties")
let benefitsclaim_jsconfig_json = __webpack_require__(/*! ./BenefitsClaim/jsconfig.json */ "./build.definitions/BenefitsClaim/jsconfig.json")
let benefitsclaim_pages_claims_claims_create_page = __webpack_require__(/*! ./BenefitsClaim/Pages/Claims/Claims_Create.page */ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_Create.page")
let benefitsclaim_pages_claims_claims_createreceipts_page = __webpack_require__(/*! ./BenefitsClaim/Pages/Claims/Claims_CreateReceipts.page */ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_CreateReceipts.page")
let benefitsclaim_pages_claims_claims_detail_page = __webpack_require__(/*! ./BenefitsClaim/Pages/Claims/Claims_Detail.page */ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_Detail.page")
let benefitsclaim_pages_claims_claims_edit_page = __webpack_require__(/*! ./BenefitsClaim/Pages/Claims/Claims_Edit.page */ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_Edit.page")
let benefitsclaim_pages_claims_claims_list_page = __webpack_require__(/*! ./BenefitsClaim/Pages/Claims/Claims_List.page */ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_List.page")
let benefitsclaim_pages_receipts_receipts_detail_page = __webpack_require__(/*! ./BenefitsClaim/Pages/Receipts/Receipts_Detail.page */ "./build.definitions/BenefitsClaim/Pages/Receipts/Receipts_Detail.page")
let benefitsclaim_pages_receipts_receipts_edit_page = __webpack_require__(/*! ./BenefitsClaim/Pages/Receipts/Receipts_Edit.page */ "./build.definitions/BenefitsClaim/Pages/Receipts/Receipts_Edit.page")
let benefitsclaim_rules_appupdatefailure_js = __webpack_require__(/*! ./BenefitsClaim/Rules/AppUpdateFailure.js */ "./build.definitions/BenefitsClaim/Rules/AppUpdateFailure.js")
let benefitsclaim_rules_appupdatesuccess_js = __webpack_require__(/*! ./BenefitsClaim/Rules/AppUpdateSuccess.js */ "./build.definitions/BenefitsClaim/Rules/AppUpdateSuccess.js")
let benefitsclaim_rules_claims_claims_cancel_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Claims/Claims_Cancel.js */ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_Cancel.js")
let benefitsclaim_rules_claims_claims_createentity_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Claims/Claims_CreateEntity.js */ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_CreateEntity.js")
let benefitsclaim_rules_claims_claims_createreceipts_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Claims/Claims_CreateReceipts.js */ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_CreateReceipts.js")
let benefitsclaim_rules_claims_claims_deleteconfirmation_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Claims/Claims_DeleteConfirmation.js */ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_DeleteConfirmation.js")
let benefitsclaim_rules_claims_claims_updateentity_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Claims/Claims_UpdateEntity.js */ "./build.definitions/BenefitsClaim/Rules/Claims/Claims_UpdateEntity.js")
let benefitsclaim_rules_claims_navtoclaims_createreceipts_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Claims/NavToClaims_CreateReceipts.js */ "./build.definitions/BenefitsClaim/Rules/Claims/NavToClaims_CreateReceipts.js")
let benefitsclaim_rules_claims_navtoclaims_edit_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Claims/NavToClaims_Edit.js */ "./build.definitions/BenefitsClaim/Rules/Claims/NavToClaims_Edit.js")
let benefitsclaim_rules_onwillupdate_js = __webpack_require__(/*! ./BenefitsClaim/Rules/OnWillUpdate.js */ "./build.definitions/BenefitsClaim/Rules/OnWillUpdate.js")
let benefitsclaim_rules_receipts_navtoreceipts_edit_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Receipts/NavToReceipts_Edit.js */ "./build.definitions/BenefitsClaim/Rules/Receipts/NavToReceipts_Edit.js")
let benefitsclaim_rules_receipts_receipts_cancel_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Receipts/Receipts_Cancel.js */ "./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_Cancel.js")
let benefitsclaim_rules_receipts_receipts_deleteconfirmation_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Receipts/Receipts_DeleteConfirmation.js */ "./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_DeleteConfirmation.js")
let benefitsclaim_rules_receipts_receipts_updateentity_js = __webpack_require__(/*! ./BenefitsClaim/Rules/Receipts/Receipts_UpdateEntity.js */ "./build.definitions/BenefitsClaim/Rules/Receipts/Receipts_UpdateEntity.js")
let benefitsclaim_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./BenefitsClaim/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/BenefitsClaim/Rules/ResetAppSettingsAndLogout.js")
let benefitsclaim_services_service1_service = __webpack_require__(/*! ./BenefitsClaim/Services/service1.service */ "./build.definitions/BenefitsClaim/Services/service1.service")
let benefitsclaim_styles_styles_css = __webpack_require__(/*! ./BenefitsClaim/Styles/Styles.css */ "./build.definitions/BenefitsClaim/Styles/Styles.css")
let benefitsclaim_styles_styles_json = __webpack_require__(/*! ./BenefitsClaim/Styles/Styles.json */ "./build.definitions/BenefitsClaim/Styles/Styles.json")
let benefitsclaim_styles_styles_less = __webpack_require__(/*! ./BenefitsClaim/Styles/Styles.less */ "./build.definitions/BenefitsClaim/Styles/Styles.less")
let benefitsclaim_styles_styles_nss = __webpack_require__(/*! ./BenefitsClaim/Styles/Styles.nss */ "./build.definitions/BenefitsClaim/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	benefitsclaim_actions_appupdate_action : benefitsclaim_actions_appupdate_action,
	benefitsclaim_actions_appupdatefailuremessage_action : benefitsclaim_actions_appupdatefailuremessage_action,
	benefitsclaim_actions_appupdateprogressbanner_action : benefitsclaim_actions_appupdateprogressbanner_action,
	benefitsclaim_actions_appupdatesuccessmessage_action : benefitsclaim_actions_appupdatesuccessmessage_action,
	benefitsclaim_actions_claims_claims_createentity_action : benefitsclaim_actions_claims_claims_createentity_action,
	benefitsclaim_actions_claims_claims_createreceipts_action : benefitsclaim_actions_claims_claims_createreceipts_action,
	benefitsclaim_actions_claims_claims_deleteentity_action : benefitsclaim_actions_claims_claims_deleteentity_action,
	benefitsclaim_actions_claims_claims_detailpopover_action : benefitsclaim_actions_claims_claims_detailpopover_action,
	benefitsclaim_actions_claims_claims_updateentity_action : benefitsclaim_actions_claims_claims_updateentity_action,
	benefitsclaim_actions_claims_navtoclaims_create_action : benefitsclaim_actions_claims_navtoclaims_create_action,
	benefitsclaim_actions_claims_navtoclaims_createreceipts_action : benefitsclaim_actions_claims_navtoclaims_createreceipts_action,
	benefitsclaim_actions_claims_navtoclaims_detail_action : benefitsclaim_actions_claims_navtoclaims_detail_action,
	benefitsclaim_actions_claims_navtoclaims_edit_action : benefitsclaim_actions_claims_navtoclaims_edit_action,
	benefitsclaim_actions_claims_navtoclaims_list_action : benefitsclaim_actions_claims_navtoclaims_list_action,
	benefitsclaim_actions_closemodalpage_cancel_action : benefitsclaim_actions_closemodalpage_cancel_action,
	benefitsclaim_actions_closemodalpage_complete_action : benefitsclaim_actions_closemodalpage_complete_action,
	benefitsclaim_actions_closepage_action : benefitsclaim_actions_closepage_action,
	benefitsclaim_actions_createentityfailuremessage_action : benefitsclaim_actions_createentityfailuremessage_action,
	benefitsclaim_actions_createentitysuccessmessage_action : benefitsclaim_actions_createentitysuccessmessage_action,
	benefitsclaim_actions_deleteconfirmation_action : benefitsclaim_actions_deleteconfirmation_action,
	benefitsclaim_actions_deleteentityfailuremessage_action : benefitsclaim_actions_deleteentityfailuremessage_action,
	benefitsclaim_actions_deleteentitysuccessmessage_action : benefitsclaim_actions_deleteentitysuccessmessage_action,
	benefitsclaim_actions_draftdiscardentity_action : benefitsclaim_actions_draftdiscardentity_action,
	benefitsclaim_actions_drafteditentity_action : benefitsclaim_actions_drafteditentity_action,
	benefitsclaim_actions_draftsaveentity_action : benefitsclaim_actions_draftsaveentity_action,
	benefitsclaim_actions_logout_action : benefitsclaim_actions_logout_action,
	benefitsclaim_actions_logoutmessage_action : benefitsclaim_actions_logoutmessage_action,
	benefitsclaim_actions_onwillupdate_action : benefitsclaim_actions_onwillupdate_action,
	benefitsclaim_actions_receipts_navtoreceipts_detail_action : benefitsclaim_actions_receipts_navtoreceipts_detail_action,
	benefitsclaim_actions_receipts_navtoreceipts_edit_action : benefitsclaim_actions_receipts_navtoreceipts_edit_action,
	benefitsclaim_actions_receipts_receipts_deleteentity_action : benefitsclaim_actions_receipts_receipts_deleteentity_action,
	benefitsclaim_actions_receipts_receipts_detailpopover_action : benefitsclaim_actions_receipts_receipts_detailpopover_action,
	benefitsclaim_actions_receipts_receipts_opendocument_action : benefitsclaim_actions_receipts_receipts_opendocument_action,
	benefitsclaim_actions_receipts_receipts_updateentity_action : benefitsclaim_actions_receipts_receipts_updateentity_action,
	benefitsclaim_actions_receipts_receipts_uploadstream_action : benefitsclaim_actions_receipts_receipts_uploadstream_action,
	benefitsclaim_actions_service_initializeonline_action : benefitsclaim_actions_service_initializeonline_action,
	benefitsclaim_actions_service_initializeonlinefailuremessage_action : benefitsclaim_actions_service_initializeonlinefailuremessage_action,
	benefitsclaim_actions_service_initializeonlinesuccessmessage_action : benefitsclaim_actions_service_initializeonlinesuccessmessage_action,
	benefitsclaim_actions_updateentityfailuremessage_action : benefitsclaim_actions_updateentityfailuremessage_action,
	benefitsclaim_actions_updateentitysuccessmessage_action : benefitsclaim_actions_updateentitysuccessmessage_action,
	benefitsclaim_actions_uploadstreamfailuremessage_action : benefitsclaim_actions_uploadstreamfailuremessage_action,
	benefitsclaim_actions_uploadstreamsuccessmessage_action : benefitsclaim_actions_uploadstreamsuccessmessage_action,
	benefitsclaim_globals_appdefinition_version_global : benefitsclaim_globals_appdefinition_version_global,
	benefitsclaim_i18n_i18n_properties : benefitsclaim_i18n_i18n_properties,
	benefitsclaim_jsconfig_json : benefitsclaim_jsconfig_json,
	benefitsclaim_pages_claims_claims_create_page : benefitsclaim_pages_claims_claims_create_page,
	benefitsclaim_pages_claims_claims_createreceipts_page : benefitsclaim_pages_claims_claims_createreceipts_page,
	benefitsclaim_pages_claims_claims_detail_page : benefitsclaim_pages_claims_claims_detail_page,
	benefitsclaim_pages_claims_claims_edit_page : benefitsclaim_pages_claims_claims_edit_page,
	benefitsclaim_pages_claims_claims_list_page : benefitsclaim_pages_claims_claims_list_page,
	benefitsclaim_pages_receipts_receipts_detail_page : benefitsclaim_pages_receipts_receipts_detail_page,
	benefitsclaim_pages_receipts_receipts_edit_page : benefitsclaim_pages_receipts_receipts_edit_page,
	benefitsclaim_rules_appupdatefailure_js : benefitsclaim_rules_appupdatefailure_js,
	benefitsclaim_rules_appupdatesuccess_js : benefitsclaim_rules_appupdatesuccess_js,
	benefitsclaim_rules_claims_claims_cancel_js : benefitsclaim_rules_claims_claims_cancel_js,
	benefitsclaim_rules_claims_claims_createentity_js : benefitsclaim_rules_claims_claims_createentity_js,
	benefitsclaim_rules_claims_claims_createreceipts_js : benefitsclaim_rules_claims_claims_createreceipts_js,
	benefitsclaim_rules_claims_claims_deleteconfirmation_js : benefitsclaim_rules_claims_claims_deleteconfirmation_js,
	benefitsclaim_rules_claims_claims_updateentity_js : benefitsclaim_rules_claims_claims_updateentity_js,
	benefitsclaim_rules_claims_navtoclaims_createreceipts_js : benefitsclaim_rules_claims_navtoclaims_createreceipts_js,
	benefitsclaim_rules_claims_navtoclaims_edit_js : benefitsclaim_rules_claims_navtoclaims_edit_js,
	benefitsclaim_rules_onwillupdate_js : benefitsclaim_rules_onwillupdate_js,
	benefitsclaim_rules_receipts_navtoreceipts_edit_js : benefitsclaim_rules_receipts_navtoreceipts_edit_js,
	benefitsclaim_rules_receipts_receipts_cancel_js : benefitsclaim_rules_receipts_receipts_cancel_js,
	benefitsclaim_rules_receipts_receipts_deleteconfirmation_js : benefitsclaim_rules_receipts_receipts_deleteconfirmation_js,
	benefitsclaim_rules_receipts_receipts_updateentity_js : benefitsclaim_rules_receipts_receipts_updateentity_js,
	benefitsclaim_rules_resetappsettingsandlogout_js : benefitsclaim_rules_resetappsettingsandlogout_js,
	benefitsclaim_services_service1_service : benefitsclaim_services_service1_service,
	benefitsclaim_styles_styles_css : benefitsclaim_styles_styles_css,
	benefitsclaim_styles_styles_json : benefitsclaim_styles_styles_json,
	benefitsclaim_styles_styles_less : benefitsclaim_styles_styles_less,
	benefitsclaim_styles_styles_nss : benefitsclaim_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Styles/Styles.css":
/*!***********************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Styles/Styles.css ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/BenefitsClaim/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/BenefitsClaim/Styles/Styles.less":
/*!************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Styles/Styles.less ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/BenefitsClaim/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/BenefitsClaim/Styles/Styles.nss":
/*!***********************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Styles/Styles.nss ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/cssWithMappingToString.js":
/*!*********************************************************************!*\
  !*** ../../../../css-loader/dist/runtime/cssWithMappingToString.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_Create.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Pages/Claims/Claims_Create.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/BenefitsClaim/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/BenefitsClaim/Rules/Claims/Claims_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Claims Detail","Controls":[{"Sections":[{"Controls":[{"Mode":"Date","_Name":"ClaimDate","Caption":"ClaimDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Provider","_Name":"Provider","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Amount","KeyboardType":"Number","_Name":"Amount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Comment","_Name":"Comment","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ClaimTypes_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Description}","ReturnValue":"{ID}","Target":{"EntitySet":"ClaimTypes","Service":"/BenefitsClaim/Services/service1.service"}},"_Name":"ClaimTypes_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Claims_Create"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_CreateReceipts.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Pages/Claims/Claims_CreateReceipts.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/BenefitsClaim/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/BenefitsClaim/Rules/Claims/Claims_CreateReceipts.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Receipts","Controls":[{"Sections":[{"Controls":[{"Caption":"ReceiptNumber","_Name":"ReceiptNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"ReceiptDate","Caption":"ReceiptDate","_Type":"Control.Type.FormCell.DatePicker"},{"AttachmentTitle":"Attachment","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":[],"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment"},{"Caption":"FileType","_Name":"FileType","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Claims_CreateReceipts"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_Detail.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Pages/Claims/Claims_Detail.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Claims Detail","DesignTimeTarget":{"Service":"/BenefitsClaim/Services/service1.service","EntitySet":"Claims","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/BenefitsClaim/Rules/Claims/NavToClaims_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/BenefitsClaim/Actions/Claims/Claims_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ClaimTypes_ID}","Subhead":"{ClaimDate}","BodyText":"","Footnote":"{Amount}","Description":"{Provider}","StatusText":"{Comment}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ClaimDate","Value":"{ClaimDate}"},{"KeyName":"Provider","Value":"{Provider}"},{"KeyName":"Amount","Value":"{Amount}"},{"KeyName":"Comment","Value":"{Comment}"},{"KeyName":"ClaimTypes_ID","Value":"{ClaimTypes_ID}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"ClaimReceipts"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{FileType}","AvatarStack":{"Avatars":[{"Image":"/BenefitsClaim/Services/service1.service/{@odata.readLink}/Attachment"}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ReceiptNumber}","Footnote":"","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{ReceiptDate}","SubstatusText":"","OnPress":"/BenefitsClaim/Actions/Receipts/NavToReceipts_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/ClaimReceipts","Service":"/BenefitsClaim/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Receipts"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Claims_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_Edit.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Pages/Claims/Claims_Edit.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Claims Detail","DesignTimeTarget":{"Service":"/BenefitsClaim/Services/service1.service","EntitySet":"Claims","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/BenefitsClaim/Rules/Claims/Claims_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/BenefitsClaim/Rules/Claims/Claims_UpdateEntity.js"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Mode":"Date","_Name":"ClaimDate","Value":"{ClaimDate}","Caption":"ClaimDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Provider","_Name":"Provider","Value":"{Provider}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Amount","_Name":"Amount","Value":"{Amount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Comment","_Name":"Comment","Value":"{Comment}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ClaimTypes_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Description}","ReturnValue":"{ID}","Target":{"EntitySet":"ClaimTypes","Service":"/BenefitsClaim/Services/service1.service"}},"Value":"{ClaimTypes_ID}","_Name":"ClaimTypes_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Claims_Edit"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Pages/Claims/Claims_List.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Pages/Claims/Claims_List.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Claims","ActionBar":{"Items":[{"OnPress":"/BenefitsClaim/Actions/Claims/NavToClaims_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Provider}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/BenefitsClaim/Actions/Claims/NavToClaims_Detail.action","StatusImage":"","Title":"{ClaimTypes_ID}","Footnote":"{Amount}","PreserveIconStackSpacing":false,"StatusText":"{Comment}","Subhead":"{ClaimDate}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Claims","Service":"/BenefitsClaim/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/BenefitsClaim/Actions/Logout.action"}]},"_Name":"Claims_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Pages/Receipts/Receipts_Detail.page":
/*!*****************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Pages/Receipts/Receipts_Detail.page ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Receipts Detail","DesignTimeTarget":{"Service":"/BenefitsClaim/Services/service1.service","EntitySet":"Receipts","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/BenefitsClaim/Rules/Receipts/NavToReceipts_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/BenefitsClaim/Actions/Receipts/Receipts_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/BenefitsClaim/Services/service1.service/{@odata.readLink}/Attachment","HeadlineText":"{ReceiptNumber}","Subhead":"{ReceiptDate}","BodyText":"","Footnote":"","Description":"{FileType}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ReceiptNumber","Value":"{ReceiptNumber}"},{"KeyName":"ReceiptDate","Value":"{ReceiptDate}"},{"KeyName":"FileType","Value":"{FileType}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Receipts_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Pages/Receipts/Receipts_Edit.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Pages/Receipts/Receipts_Edit.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Receipts Detail","DesignTimeTarget":{"Service":"/BenefitsClaim/Services/service1.service","EntitySet":"Receipts","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/BenefitsClaim/Rules/Receipts/Receipts_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/BenefitsClaim/Rules/Receipts/Receipts_UpdateEntity.js"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"ReceiptNumber","_Name":"ReceiptNumber","Value":"{ReceiptNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"ReceiptDate","Value":"{ReceiptDate}","Caption":"ReceiptDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"FileType","_Name":"FileType","Value":"{FileType}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Receipts_Edit"}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"BenefitsClaim","Version":"/BenefitsClaim/Globals/AppDefinition_Version.global","MainPage":"/BenefitsClaim/Pages/Claims/Claims_List.page","OnLaunch":["/BenefitsClaim/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/BenefitsClaim/Rules/OnWillUpdate.js","OnDidUpdate":"/BenefitsClaim/Actions/Service/InitializeOnline.action","Styles":"/BenefitsClaim/Styles/Styles.less","Localization":"/BenefitsClaim/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/BenefitsClaim/Styles/Styles.css","ios":"/BenefitsClaim/Styles/Styles.nss","android":"/BenefitsClaim/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/AppUpdate.action":
/*!******************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/AppUpdate.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/BenefitsClaim/Rules/AppUpdateFailure.js","OnSuccess":"/BenefitsClaim/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/AppUpdateFailureMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/AppUpdateFailureMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/AppUpdateProgressBanner.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/AppUpdateProgressBanner.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/BenefitsClaim/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/AppUpdateSuccessMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/AppUpdateSuccessMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_CreateEntity.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/Claims_CreateEntity.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/BenefitsClaim/Actions/CreateEntityFailureMessage.action","OnSuccess":"/BenefitsClaim/Actions/CreateEntitySuccessMessage.action","Properties":{"ClaimDate":"#Control:ClaimDate/#Value","Provider":"#Control:Provider/#Value","Amount":"#Control:Amount/#Value","Comment":"#Control:Comment/#Value","ClaimTypes_ID":"#Control:ClaimTypes_ID/#SelectedValue"},"Target":{"EntitySet":"Claims","Service":"/BenefitsClaim/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_CreateReceipts.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/Claims_CreateReceipts.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"ClaimReceipts","Target":{"EntitySet":"Claims","ReadLink":"{@odata.readLink}"}},"OnFailure":"/BenefitsClaim/Actions/CreateEntityFailureMessage.action","OnSuccess":"/BenefitsClaim/Actions/CreateEntitySuccessMessage.action","Properties":{"ReceiptNumber":"#Control:ReceiptNumber/#Value","ReceiptDate":"#Control:ReceiptDate/#Value","FileType":"#Control:FileType/#Value"},"Target":{"EntitySet":"Receipts","Service":"/BenefitsClaim/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_DeleteEntity.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/Claims_DeleteEntity.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Claims","Service":"/BenefitsClaim/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/BenefitsClaim/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/BenefitsClaim/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_DetailPopover.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/Claims_DetailPopover.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Receipts","OnPress":"/BenefitsClaim/Rules/Claims/NavToClaims_CreateReceipts.js"},{"Title":"Delete","OnPress":"/BenefitsClaim/Rules/Claims/Claims_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/Claims_UpdateEntity.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/Claims_UpdateEntity.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Claims","Service":"/BenefitsClaim/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ClaimDate":"#Control:ClaimDate/#Value","Provider":"#Control:Provider/#Value","Amount":"#Control:Amount/#Value","Comment":"#Control:Comment/#Value","ClaimTypes_ID":"#Control:ClaimTypes_ID/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/BenefitsClaim/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Create.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Create.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/BenefitsClaim/Pages/Claims/Claims_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_CreateReceipts.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_CreateReceipts.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/BenefitsClaim/Pages/Claims/Claims_CreateReceipts.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Detail.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Detail.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/BenefitsClaim/Pages/Claims/Claims_Detail.page"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Edit.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_Edit.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/BenefitsClaim/Pages/Claims/Claims_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_List.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Claims/NavToClaims_List.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/BenefitsClaim/Pages/Claims/Claims_List.page"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/CloseModalPage_Cancel.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/CloseModalPage_Complete.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/ClosePage.action":
/*!******************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/ClosePage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/CreateEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/CreateEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/CreateEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/CreateEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/BenefitsClaim/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/DeleteConfirmation.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/DeleteConfirmation.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/DeleteEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/DeleteEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/DeleteEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/DeleteEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/BenefitsClaim/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/DraftDiscardEntity.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/DraftDiscardEntity.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/BenefitsClaim/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/BenefitsClaim/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/DraftEditEntity.action":
/*!************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/DraftEditEntity.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/BenefitsClaim/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/BenefitsClaim/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/DraftSaveEntity.action":
/*!************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/DraftSaveEntity.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/BenefitsClaim/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/BenefitsClaim/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Logout.action":
/*!***************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Logout.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/LogoutMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/LogoutMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/BenefitsClaim/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/OnWillUpdate.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/OnWillUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Receipts/NavToReceipts_Detail.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Receipts/NavToReceipts_Detail.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/BenefitsClaim/Pages/Receipts/Receipts_Detail.page"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Receipts/NavToReceipts_Edit.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Receipts/NavToReceipts_Edit.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/BenefitsClaim/Pages/Receipts/Receipts_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_DeleteEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_DeleteEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Receipts","Service":"/BenefitsClaim/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/BenefitsClaim/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/BenefitsClaim/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_DetailPopover.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_DetailPopover.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/BenefitsClaim/Actions/Receipts/Receipts_OpenDocument.action"},{"Title":"Delete","OnPress":"/BenefitsClaim/Rules/Receipts/Receipts_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_OpenDocument.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_OpenDocument.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/BenefitsClaim/Services/service1.service/{@odata.readLink}/Attachment","MimeType":"{FileType}"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_UpdateEntity.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_UpdateEntity.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Receipts","Service":"/BenefitsClaim/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ReceiptNumber":"#Control:ReceiptNumber/#Value","ReceiptDate":"#Control:ReceiptDate/#Value","FileType":"#Control:FileType/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/BenefitsClaim/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_UploadStream.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Receipts/Receipts_UploadStream.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UploadStream","Target":{"Service":"/BenefitsClaim/Services/service1.service","EntitySet":"Receipts","ReadLink":"{@odata.readLink}"},"Properties":{"Attachment":"#Control:Attachment/#Value"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"uploadstream"},"OnSuccess":"/BenefitsClaim/Actions/UploadStreamSuccessMessage.action","OnFailure":"/BenefitsClaim/Actions/UploadStreamFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Service/InitializeOnline.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Service/InitializeOnline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/BenefitsClaim/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/BenefitsClaim/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/BenefitsClaim/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Service/InitializeOnlineFailureMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/UpdateEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/UpdateEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/UpdateEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/BenefitsClaim/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/UploadStreamFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/UploadStreamFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload stream failure - {#ActionResults:uploadstream/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Actions/UploadStreamSuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Actions/UploadStreamSuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Stream uploaded","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/BenefitsClaim/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Globals/AppDefinition_Version.global":
/*!******************************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Globals/AppDefinition_Version.global ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/BenefitsClaim/Services/service1.service":
/*!*******************************************************************!*\
  !*** ./build.definitions/BenefitsClaim/Services/service1.service ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/MKBenefitApplication/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map