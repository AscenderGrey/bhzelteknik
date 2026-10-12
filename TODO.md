# BHZ Elteknik – att komplettera innan lansering

1. **Porträttfoton** – 3 matchande, professionella porträtt (Stefan, Mattias, Magnus). Läggs i `public/img/team/{slug}.jpg` och ersätter bokstavsbrickorna automatiskt.
2. **Titlar** – bekräfta VD och övriga titlar (LinkedIn anger Stefan som VD; sidan visar idag "Grundare & delägare" för alla tre).
3. **Behörigheter & certifieringar** – registrering hos Elsäkerhetsverket, Installatörsföretagen-medlemskap, försäkring, garantier och ev. certifieringar för larm/säkerhet. Bekräfta och lägg till.
4. **Säkerhet & larm** – vilka system ni installerar (inbrottslarm, passer, kamera, brandlarm?) så texten kan bli mer konkret.
5. **Foton** – bilder från KNX- och säkerhetsjobb (de sidorna saknar projektbilder idag).
6. **Referenskunder/projekt** – kunder och projekt ni är okej med att vi namnger.
7. **Google-omdömen** – Google Business Profile och omdömen att visa/länka.
8. **Svarstider** – ska vi lova något om hur snabbt ni kommer ut? Idag lovar sidan inget.
9. **GHL webhook** – sätt `GHL_WEBHOOK_URL` i Vercel så att offertförfrågningar landar i CRM:et (idag loggas de bara).
10. **Domänbyte** – flytta bhzelteknik.se från One.com-DNS till Vercel, sätt `NEXT_PUBLIC_SITE_URL=https://bhzelteknik.se` och deploya om.
11. **Integritetspolicy** – mallen behöver granskas av er.
