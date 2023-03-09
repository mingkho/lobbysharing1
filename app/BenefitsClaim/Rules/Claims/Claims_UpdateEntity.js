export default function UpdateEntity(clientAPI) {
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