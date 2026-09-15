import { emailShell, getTransport, validateSpam } from './_mail.js';
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed.' });
    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        if (validateSpam(body))
            return res.status(200).json({ ok: true });
        if (!body.name || !body.email || !body.relationship || !body.review)
            return res.status(400).json({ message: 'Please complete the required fields.' });
        if (!validEmail(body.email))
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        if (String(body.review).length < 30 || String(body.review).length > 1200)
            return res.status(400).json({ message: 'Review must be between 30 and 1200 characters.' });
        const transport = getTransport();
        const owner = process.env.CONTACT_TO || process.env.GMAIL_USER;
        const ownerHtml = emailShell({
            eyebrow: 'New recommendation submission',
            title: 'A new review is waiting for approval.',
            intro: 'This review was submitted privately from the portfolio and is not automatically published.',
            tone: 'violet',
            status: 'Review submission',
            rows: [{ label: 'Name', value: body.name }, { label: 'Email', value: body.email }, { label: 'Role', value: body.role }, { label: 'Company', value: body.company }, { label: 'Relationship', value: body.relationship }, { label: 'Rating', value: `${body.rating || 5}/5` }, { label: 'Review', value: body.review }]
        });
        const visitorHtml = emailShell({ eyebrow: 'Thank you', title: 'Your recommendation was received.', intro: 'Thanks for taking the time to share specific feedback. It was sent privately for review before publication.', rows: [{ label: 'Your review', value: body.review }], footer: 'Anayat Ullah · Full Stack Developer', tone: 'emerald', status: 'Review received' });
        await Promise.all([
            transport.sendMail({ from: `Anayat Ullah Portfolio <${process.env.GMAIL_USER}>`, to: owner, replyTo: body.email, subject: `Portfolio review submission — ${body.name}`, html: ownerHtml }),
            transport.sendMail({ from: `Anayat Ullah <${process.env.GMAIL_USER}>`, to: body.email, replyTo: owner, subject: 'Thanks for your recommendation', html: visitorHtml })
        ]);
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        console.error('Review email error:', error);
        return res.status(500).json({ message: error.message === 'Email service is not configured.' ? error.message : 'Review could not be sent right now.' });
    }
}
