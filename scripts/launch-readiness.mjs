const requiredLegalFields = [
  'companyName', 'tradeName', 'legalForm', 'siren', 'registration',
  'streetAddress', 'postalCode', 'locality', 'email', 'phone',
  'publisher', 'hostName', 'hostAddress', 'hostPhone'
];

export function publicLaunchReady(config, origin) {
  return config.publishReady === true
    && origin.replace(/\/$/, '') === config.origin.replace(/\/$/, '')
    && requiredLegalFields.every(key => typeof config.legal[key] === 'string' && config.legal[key].trim().length > 0);
}
