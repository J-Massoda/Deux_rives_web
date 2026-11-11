export function contactSettings(env = process.env) {
  const formId = env.FORMSPREE_FORM_ID?.trim() ?? '';
  const bookingUrl = env.GOOGLE_BOOKING_URL?.trim() || 'https://calendar.app.google/sKCVgdHbJ9b6D5NN6';

  if (formId && !/^[a-z0-9]+$/i.test(formId)) {
    throw new Error('FORMSPREE_FORM_ID must contain only the Formspree form ID.');
  }
  if (bookingUrl) {
    const url = new URL(bookingUrl);
    const isBookingPage = url.hostname === 'calendar.app.google' ||
      (url.hostname === 'calendar.google.com' && url.pathname.includes('/appointments/'));
    if (url.protocol !== 'https:' || url.username || url.password || url.port || !isBookingPage) {
      throw new Error('GOOGLE_BOOKING_URL must be the public HTTPS Google Calendar appointment link.');
    }
  }

  return {
    endpoint: formId ? 'https://formspree.io/f/' + formId : '',
    bookingUrl
  };
}
