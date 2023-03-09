export default function NavToEdit(clientAPI) {
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