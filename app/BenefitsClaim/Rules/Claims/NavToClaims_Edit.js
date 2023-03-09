export default function NavToEdit(clientAPI) {
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