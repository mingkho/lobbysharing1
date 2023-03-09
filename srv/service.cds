using { MKBenefitApplication as my } from '../db/schema';

using MKBenefitApplication from '../db/schema';

@path : 'service/MKBenefitApplication'
service MKBenefitApplicationService
{
    entity Claims as
        projection on my.Claims;

    entity Receipts as
        projection on my.Receipts;

    entity ClaimTypes as
        projection on my.ClaimTypes;
}

annotate MKBenefitApplicationService with @requires :
[
    'authenticated-user'
];
