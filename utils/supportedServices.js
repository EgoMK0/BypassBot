const supportedServices = [
    { name: 'codex', domains: ['codex.com'] },
    { name: 'trigon', domains: ['trigon.com'] },
    { name: 'rekonise', domains: ['rekonise.com'] },
    { name: 'linkvertise', domains: ['linkvertise.com', 'linkvertise.net'] },
    { name: 'paster-so', domains: ['paster.so'] },
    { name: 'cuttlinks', domains: ['cuttlinks.com', 'cutt.ly'] },
    { name: 'boost-ink-and-bst-gg', domains: ['boost.ink', 'bst.gg'] },
    { name: 'keyguardian', domains: ['keyguardian.com'] },
    { name: 'bstshrt', domains: ['bstshrt.com'] },
    { name: 'Pnicuse-getkey', domains: ['getkey.com'] },
    { name: 'hadfoc.us', domains: ['hadfoc.us'] },
    { name: 'bit.do', domains: ['bit.do'] },
    { name: 'bit.ly', domains: ['bit.ly'] },
    { name: 'blox-script', domains: ['blox-script.com'] },
    { name: 'boost.ink', domains: ['boost.ink'] },
    { name: 'cuty-cuttlinks', domains: ['cuty.io', 'cuttlinks.com'] },
    { name: 'getpolsec', domains: ['getpolsec.com'] },
    { name: 'is.gd', domains: ['is.gd'] },
    { name: 'ldnesspublic', domains: ['ldnesspublic.com'] },
    { name: 'Link-hub.net', domains: ['link-hub.net'] },
    { name: 'Link-unlock-complete', domains: ['link-unlock.com'] },
    { name: 'Link4m.com', domains: ['link4m.com'] },
    { name: 'Linkunlock', domains: ['linkunlock.com'] },
    { name: 'Linkunlocker.com', domains: ['linkunlocker.com'] },
    { name: 'lockr', domains: ['lockr.com'] },
    { name: 'mboost', domains: ['mboost.me'] },
    { name: 'mediafire', domains: ['mediafire.com'] },
    { name: 'overdrivehub', domains: ['overdrivehub.com'] },
    { name: 'paste-drop.com', domains: ['paste-drop.com'] },
    { name: 'pastebin.com', domains: ['pastebin.com'] },
    { name: 'pastes.io', domains: ['pastes.io'] },
    { name: 'quartyz', domains: ['quartyz.com'] },
    { name: 'rebrand.ly', domains: ['rebrand.ly'] },
    { name: 'rekonise.com', domains: ['rekonise.com'] },
    { name: 'rentry.co', domains: ['rentry.co'] },
    { name: 'rinku-pro', domains: ['rinku.pro'] },
    { name: 'rkns.link', domains: ['rkns.link'] },
    { name: 'shorteners-and-direct', domains: ['shorteners.com'] },
    { name: 'shorter.me', domains: ['shorter.me'] },
    { name: 'sub2get.com', domains: ['sub2get.com'] },
    { name: 'sub2unlock.net', domains: ['sub2unlock.net'] },
    { name: 'socialwolvez.com', domains: ['socialwolvez.com'] },
    { name: 'sub4unlock.com', domains: ['sub4unlock.com'] },
    { name: 'subfinal', domains: ['subfinal.com'] },
    { name: 't.co', domains: ['t.co'] },
    { name: 't.ly', domains: ['t.ly'] },
    { name: 'tiny.cc', domains: ['tiny.cc'] },
    { name: 'tinylink.onl', domains: ['tinylink.onl'] },
    { name: 'tpi.li', domains: ['tpi.li'] },
    { name: 'unlocknow.net', domains: ['unlocknow.net'] },
    { name: 'ytsubme', domains: ['ytsubme.com'] },
    { name: 'ace-bypass.com', domains: ['ace-bypass.com'] },
    { name: 'tinyurl.com', domains: ['tinyurl.com'] },
    { name: 'v.gd', domains: ['v.gd'] },
    { name: 'delta', domains: ['delta.com'] },
    { name: 'krnl', domains: ['krnl.com'] },
    { name: 'platoboost', domains: ['platoboost.com'] }
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
