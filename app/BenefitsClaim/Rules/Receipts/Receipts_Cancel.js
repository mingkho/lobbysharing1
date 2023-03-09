export default function Cancel(clientAPI) {
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