import { messages, SupportedLocale } from '../../../i18n/messages';

function getEmailMessages(locale: string) {
  const lang = (locale in messages ? locale : 'en') as SupportedLocale;
  return messages[lang].email;
}

function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

export const emailTemplates = {
  passwordReset: {
    subject: (locale: string) => getEmailMessages(locale).passwordReset.subject,
    text: (locale: string, name: string, url: string) => {
      const t = getEmailMessages(locale).passwordReset;
      return [
        interpolate(t.greeting, { name }),
        '',
        t.message,
        url,
        '',
        t.expiration,
        '',
        t.footer
      ].join('\n');
    },
    html: (locale: string, name: string, url: string) => {
      const t = getEmailMessages(locale).passwordReset;
      return `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>${t.title}</h2>
            <p>${interpolate(t.greeting, { name })}</p>
            <p>${t.message}</p>
            <p>
              <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
                ${t.button}
              </a>
            </p>
            <p>${t.expiration}</p>
            <p>${t.footer}</p>
          </body>
        </html>
      `;
    },
  },
};
