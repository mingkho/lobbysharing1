export default function CreateRelatedEntity(clientAPI) {
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