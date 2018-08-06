import { Injectable } from '@angular/core';

@Injectable()
export class OrganizationsRepository {
    public organizations : Array<any> = [];
    
    constructor(){
        this.organizations = [{
            "name" : 'צער בעלי חיים בישראל',
            "website" : 'https://spca.co.il/',
            "phone" : '03-5136500',
            "address" : 'הרצל 159, תל אביב יפו',
            "donationLink" : 'https://spca.co.il/donations-he',
            "region" : 'מרכז',
            "location" : {
                latitude : "32.046762",
                longtitude : "34.769265"
            },
            "email" : 'info@spca.co.il',
            
        }, {
            "name" : 'צער בעלי חיים רמת גן והסביבה',
            "website" : 'https://www.spca.org.il/',
            "phone" : '050-7795477',
            "address" : 'חפץ חיים 4, תל אביב יפו',
            "donationLink" : 'https://www.spca.org.il/%D7%AA%D7%A8%D7%95%D7%9E%D7%95%D7%AA/',
            "region" : 'מרכז',
            "location" : {
                latitude : "32.073528",
                longtitude : "34.798789"
            },
            "email" : 'office@spca.org.il',
            
        }, {
            "name" : 'עמותת S.O.S חיות',
            "website" : 'https://www.sospets.co.il',
            "phone" : '03-7441010',
            "address" : 'טאגור 38, תל אביב יפו',
            "donationLink" : 'https://www.sospets.co.il/donations',
            "region" : 'מרכז',
            "location" : {
                latitude : "32.117238",
                longtitude : "34.797464"
            },
            "email" : 'office@sospets.co.il',
            
        }, {
            "name" : 'אגודת צער בעלי חיים חיפה',
            "website" : 'http://www.petprotect.org.il/',
            "phone" : '04-8729696',
            "address" : 'מעגן הדיג שביט, דרך משה דיין, מפרץ חיפה',
            "donationLink" : 'http://www.petprotect.org.il/%D7%AA%D7%A8%D7%95%D7%9E%D7%94',
            "region" : 'צפון',
            "location" : {
                latitude : "32.806690",
                longtitude : "35.031430"
            },
            "email" : 'hspca@netvision.net.il',
            
        }, {
            "name" : 'צער בעלי חיים ירושלים',
            "website" : 'http://jspca.org.il/',
            "phone" : '02-585-4465',
            "address" : 'פרי עמל 3, ירושלים',
            "donationLink" : 'http://jspca.org.il/%D7%AA%D7%A8%D7%95%D7%9E%D7%95%D7%AA/',
            "region" : 'איזור ירושלים',
            "location" : {
                latitude : "31.853254",
                longtitude : "35.222795"
            },
            "email" : 'jspca.jeru@gmail.com',
            
        }, {
            "name" : 'צער בעלי חיים רחובות',
            "website" : 'http://rehovotspa.org.il/',
            "phone" : '08-9460135',
            "address" : 'מוטי קינד 5, רחובות',
            "donationLink" : 'http://rehovotspa.org.il/donation/',
            "region" : 'שפלה',
            "location" : {
                latitude : "31.895063",
                longtitude : "34.788604"
            },
            "email" : '',
            
        }, {
            "name" : 'צער בעלי חיים באר שבע',
            "website" : 'http://spca.netfirms.com/',
            "phone" : '08-6281808',
            "address" : 'יהושע הצורף 7, באר שבע',
            "donationLink" : '',
            "region" : '',
            "location" : {
                latitude : "31.257239",
                longtitude : "34.816237"
            },
            "email" : '',
            
        }];
    }
}