import axios from 'axios';

import { IEmail } from '../types/email.types.d';
import { SENDINBLUE_API_KEY } from '../config/environment';

export default async function sendEmail(email: IEmail) {
  try {
    const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', {
      sender: {
        name: `Gestores`,
        email: 'register@gestores.com'
      },
      to: [
        {
          email: email.to,
          name: 'Nuevo usuario'
        }
      ],
      subject: email.subject,
      htmlContent: email.html,
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
        charset: 'iso-8859-1'
      }
    }, {
      headers: {
        'accept': 'application/json',
        'api-key': SENDINBLUE_API_KEY,
        'content-type': 'application/json'
      }
    });
    return { result: true, response };
  } catch (error) {
    return { result: false, error };
  }
}



