export default function UpdateEntity(clientAPI) {
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