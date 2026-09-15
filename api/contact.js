import { emailShell, esc, getTransport, validateSpam } from './_mail.js';
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed.' });
    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const spam = validateSpam(body);
        if (spam)
            return res.status(200).json({ ok: true });
        const required = ['name', 'email', 'projectType', 'message'];
        if (required.some((key) => !String(body[key] || '').trim()))
            return res.status(400).json({ message: 'Please complete the required fields.' });
        if (!validEmail(body.email))
            return res.status(400).json({ message: 'Please enter a valid email address.' });
        if (String(body.message).length < 20 || String(body.message).length > 2000)
            return res.status(400).json({ message: 'Message length is invalid.' });
        if (body.kind === 'booking' && (!body.preferredDate || !body.preferredTime || !body.timezone))
            return res.status(400).json({ message: 'Booking requests need a preferred date, time and timezone.' });
        const transport = getTransport();
        const owner = process.env.CONTACT_TO || process.env.GMAIL_USER;
        const subject = body.kind === 'booking' ? `Portfolio booking request — ${body.name}` : `Portfolio inquiry — ${body.name}`;
        const ownerHtml = emailShell({
            eyebrow: body.kind === 'booking' ? 'New booking request' : 'New portfolio inquiry',
            title: body.kind === 'booking' ? 'Someone wants to book a conversation.' : 'A new opportunity just came in.',
            intro: 'Reply directly to this email to continue the conversation with the sender.',
            tone: body.kind === 'booking' ? 'violet' : 'blue',
            status: body.kind === 'booking' ? 'Booking request' : 'New inquiry',
            rows: [
                { label: 'Name', value: body.name }, { label: 'Email', value: body.email }, { label: 'Company', value: body.company }, { label: 'Phone', value: body.phone },
                { label: 'Type', value: body.projectType }, { label: 'Budget / context', value: body.budget }, { label: 'Preferred date', value: body.preferredDate },
                { label: 'Preferred time', value: body.preferredTime }, { label: 'Timezone', value: body.timezone }, { label: 'Message', value: body.message }
            ]
        });
        const visitorHtml = emailShell({
            eyebrow: 'Message received',
            title: body.kind === 'booking' ? 'Thanks — your booking request is in.' : 'Thanks — I received your message.',
            intro: body.kind === 'booking' ? 'I’ll review your preferred time and reply by email to confirm the conversation.' : 'I’ll review the details and reply as soon as I can.',
            rows: [{ label: 'Request type', value: body.projectType }, { label: 'Message', value: body.message }],
            footer: 'Anayat Ullah · Full Stack Developer',
            tone: 'emerald',
            status: body.kind === 'booking' ? 'Booking received' : 'Message received'
        });
        await Promise.all([
            transport.sendMail({ from: `Anayat Ullah Portfolio <${process.env.GMAIL_USER}>`, to: owner, replyTo: body.email, subject, html: ownerHtml, text: `${body.name} (${body.email})\n${body.projectType}\n\n${body.message}` }),
            transport.sendMail({ from: `Anayat Ullah <${process.env.GMAIL_USER}>`, to: body.email, replyTo: owner, subject: body.kind === 'booking' ? 'Your booking request was received' : 'Thanks for reaching out', html: visitorHtml, text: `Thanks ${esc(body.name)}. Your message was received and I’ll reply by email.` })
        ]);
        return res.status(200).json({ ok: true });
    }
    catch (error) {
        console.error('Contact email error:', error);
        return res.status(500).json({ message: error.message === 'Email service is not configured.' ? error.message : 'Email could not be sent right now. Please try again or email directly.' });
    }
}
