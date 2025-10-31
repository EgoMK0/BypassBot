const supportedServices = [
    { name: 'Linkvertise', domains: ['linkvertise.com', 'linkvertise.net'] },
    { name: 'LootDest', domains: ['lootdest.com', 'lootdest.org', 'lootdest.info'] },
    { name: 'LootLinks', domains: ['lootlinks.com', 'loot-links.com', 'lootlink.org'] },
    { name: 'Work.ink', domains: ['work.ink', 'workink.net'] },
    { name: 'Sub2Unlock', domains: ['sub2unlock.com', 'sub2unlock.net'] },
    { name: 'Rekonise', domains: ['rekonise.com'] },
    { name: 'Letsboost', domains: ['letsboost.net'] },
    { name: 'SocialWolvez', domains: ['socialwolvez.com'] },
    { name: 'Mboost', domains: ['mboost.me'] },
    { name: 'Mega.link', domains: ['mega.link'] },
    { name: 'ClaimGG', domains: ['claim.gg'] },
    { name: 'Loot-Link', domains: ['loot-link.com'] },
    { name: 'Loot-Links.com', domains: ['loot-links.com'] },
    { name: 'Adrinolinks', domains: ['adrinolinks.com'] },
    { name: 'ShortLy', domains: ['short.ly'] },
    { name: 'UploadHaven', domains: ['uploadhaven.com'] },
    { name: 'CoronaVirusMap', domains: ['coronavirusmap.com'] },
    { name: 'Linkify', domains: ['linkify.net'] },
    { name: 'BoostHub', domains: ['boosthub.net'] }
];

function isAdLink(url) {
    const urlLower = url.toLowerCase();
    return supportedServices.some(service => 
        service.domains.some(domain => urlLower.includes(domain))
    );
}

function getSupportedServicesList() {
    return supportedServices.map(service => service.name);
}

module.exports = { supportedServices, isAdLink, getSupportedServicesList };
