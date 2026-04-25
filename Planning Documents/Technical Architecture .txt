Technical Architecture
Since this will be raw source code, I’d structure it as a static marketing site with reusable templates or partials, even if you are not using a CMS. That means:
* one shared layout
* reusable section components in source
* workshop/program content stored in simple structured files or constants
* static pages for Home, Workshops, Programs, Resources, About, Contact, Book a Workshop
* form handling through a lightweight backend endpoint or third-party form service
Tradeoff:
* this keeps performance, control, and design freedom high
* but you should resist adding too many content-heavy pages, because without a CMS, maintenance cost rises quickly
