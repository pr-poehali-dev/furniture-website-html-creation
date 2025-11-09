import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr, validator

class ContactForm(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    email: EmailStr | None = None
    message: str = Field(default='', max_length=2000)
    
    @validator('phone')
    def validate_phone(cls, v):
        digits = ''.join(filter(str.isdigit, v))
        if len(digits) < 10:
            raise ValueError('Номер телефона должен содержать минимум 10 цифр')
        return v

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form data via email using SMTP
    Args: event - dict with httpMethod, body containing name, phone, email, message
          context - object with request_id, function_name attributes
    Returns: HTTP response dict with status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        form_data = ContactForm(**body_data)
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not all([smtp_host, smtp_user, smtp_password]):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'SMTP configuration is missing'}),
                'isBase64Encoded': False
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта от {form_data.name}'
        msg['From'] = smtp_user
        msg['To'] = smtp_user
        
        text_content = f'''
Новая заявка с сайта TRIKC

Имя: {form_data.name}
Телефон: {form_data.phone}
Email: {form_data.email or 'не указан'}

Сообщение:
{form_data.message or 'не указано'}

---
Заявка отправлена через форму на сайте
ID запроса: {context.request_id}
'''
        
        message_html = ''
        if form_data.message:
            message_escaped = form_data.message.replace(chr(10), '<br>')
            message_html = f'''
            <div class="field">
                <span class="label">Сообщение:</span>
                <div class="value" style="margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #0c3a1b;">
                    {message_escaped}
                </div>
            </div>
            '''
        
        email_value = f'<a href="mailto:{form_data.email}">{form_data.email}</a>' if form_data.email else 'не указан'
        
        html_content = f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #0c3a1b 0%, #1a5a2e 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #0c3a1b; }}
        .value {{ color: #333; }}
        .footer {{ background: #f0f0f0; padding: 10px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">Новая заявка с сайта TRIKC</h2>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">Имя:</span>
                <span class="value">{form_data.name}</span>
            </div>
            <div class="field">
                <span class="label">Телефон:</span>
                <span class="value"><a href="tel:{form_data.phone}">{form_data.phone}</a></span>
            </div>
            <div class="field">
                <span class="label">Email:</span>
                <span class="value">{email_value}</span>
            </div>
            {message_html}
        </div>
        <div class="footer">
            Заявка отправлена через форму на сайте | ID: {context.request_id}
        </div>
    </div>
</body>
</html>'''
        
        part1 = MIMEText(text_content, 'plain', 'utf-8')
        part2 = MIMEText(html_content, 'html', 'utf-8')
        
        msg.attach(part1)
        msg.attach(part2)
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена'
            }),
            'isBase64Encoded': False
        }
        
    except ValueError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'}),
            'isBase64Encoded': False
        }