{
	"_Name": "BenefitsClaim",
	"Version": "/BenefitsClaim/Globals/AppDefinition_Version.global",
	"MainPage": "/BenefitsClaim/Pages/Claims/Claims_List.page",
	"OnLaunch": [
		"/BenefitsClaim/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/BenefitsClaim/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/BenefitsClaim/Actions/Service/InitializeOnline.action",
	"Styles": "/BenefitsClaim/Styles/Styles.less",
	"Localization": "/BenefitsClaim/i18n/i18n.properties",
	"_SchemaVersion": "6.3"
}