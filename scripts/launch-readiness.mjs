// Explicit activation, verified business details and production origin must agree.
export function publicLaunchReady(config,origin){
 const required=['companyName','legalForm','siren','rcs','registeredAddress','email','publisher','hostName','hostAddress'];
 return config.publishReady===true&&required.every(key=>typeof config.legal[key]==='string'&&config.legal[key].trim())&&origin.replace(/\/$/,'')===config.origin.replace(/\/$/,'');
}
