import nodemailer from 'nodemailer';

// Create transporter (you'll need to configure with your email service)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail(email: string, name: string, position: number) {
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@yournextstadium.nl',
    to: email,
    subject: 'Welkom bij de YourNextStadium Waitlist! 🏟️',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welkom bij YourNextStadium!</h1>
          <p style="color: #E8F5E8; margin: 10px 0 0 0; font-size: 16px;">Je mystery voetbal avontuur begint hier</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #1B5E20; margin-bottom: 20px;">Hoi ${name}! 👋</h2>
          
          <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
            Geweldig dat je je hebt aangemeld voor onze waitlist! Je bent nu officieel onderdeel van de YourNextStadium community.
          </p>
          
          <div style="background: #F1F8E9; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h3 style="color: #1B5E20; margin: 0 0 10px 0;">Je Positie op de Waitlist</h3>
            <div style="font-size: 36px; font-weight: bold; color: #FF6D00; margin: 10px 0;">#${position}</div>
            <p style="color: #666; margin: 0; font-size: 14px;">Hoe eerder je je aanmeldt, hoe eerder je toegang krijgt!</p>
          </div>
          
          <h3 style="color: #1B5E20; margin: 30px 0 15px 0;">Wat kun je verwachten?</h3>
          <ul style="color: #333; line-height: 1.8; padding-left: 20px;">
            <li>🎯 <strong>Exclusieve vroege toegang</strong> tot onze mystery trips</li>
            <li>💰 <strong>Speciale kortingen</strong> voor waitlist leden</li>
            <li>📧 <strong>Updates</strong> over nieuwe bestemmingen en features</li>
            <li>🏟️ <strong>Insider tips</strong> over Europese stadions</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://yournextstadium.nl" style="background: linear-gradient(135deg, #FF6D00, #F57C00); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              Bezoek Onze Website
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            Heb je vragen? Stuur ons een email op <a href="mailto:info@yournextstadium.nl" style="color: #1B5E20;">info@yournextstadium.nl</a>
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

export async function sendContactNotification(submission: any) {
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@yournextstadium.nl',
    to: process.env.ADMIN_EMAIL || 'admin@yournextstadium.nl',
    subject: `Nieuw Contact Formulier: ${submission.subject}`,
    html: `
      <h2>Nieuw Contact Formulier Ingediend</h2>
      <p><strong>Naam:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Telefoon:</strong> ${submission.phone || 'Niet opgegeven'}</p>
      <p><strong>Onderwerp:</strong> ${submission.subject}</p>
      <p><strong>Bericht:</strong></p>
      <p>${submission.message}</p>
      <p><strong>Ingediend op:</strong> ${new Date().toLocaleString('nl-NL')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending contact notification:', error);
  }
}