import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Button from './Button';

export default function ContactForm() {
  const { t } = useTranslation('contact');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }
      
      // Handle success
      setFormStatus({ submitting: false, submitted: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ 
        submitting: false, 
        submitted: false, 
        error: error.message || 'Failed to send message. Please try again.'
      });
    }
  };
  
  if (formStatus.submitted) {
    return (
      <div className="form-success">
        <h3>{t('form.success.title', 'Thank You!')}</h3>
        <p>{t('form.success.message', 'Your message has been sent successfully. We\'ll get back to you shortly.')}</p>
        <Button 
          onClick={() => setFormStatus({ submitting: false, submitted: false, error: null })}
          variant="secondary"
        >
          {t('form.success.button', 'Send Another Message')}
        </Button>
      </div>
    );
  }
  
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {formStatus.error && (
        <div className="form-error">
          <p>{formStatus.error}</p>
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="name">{t('form.fields.name', 'Name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">{t('form.fields.email', 'Email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">{t('form.fields.phone', 'Phone (optional)')}</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="service">{t('form.fields.service', 'Service Interested In')}</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">{t('form.fields.selectService', 'Select a service')}</option>
          <option value="custom-furniture">{t('form.services.furniture', 'Custom Furniture')}</option>
          <option value="kitchen">{t('form.services.kitchen', 'Kitchen Renovations')}</option>
          <option value="built-ins">{t('form.services.builtins', 'Built-in Shelving')}</option>
          <option value="flooring">{t('form.services.flooring', 'Wooden Floors')}</option>
          <option value="outdoor">{t('form.services.outdoor', 'Outdoor Structures')}</option>
          <option value="trim">{t('form.services.trim', 'Trim & Molding')}</option>
          <option value="other">{t('form.services.other', 'Other (please specify)')}</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="message">{t('form.fields.message', 'Message')}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
      </div>
      
      <Button 
        type="submit"
        variant="primary"
        disabled={formStatus.submitting}
      >
        {formStatus.submitting 
          ? t('form.buttons.sending', 'Sending...') 
          : t('form.buttons.send', 'Send Message')}
      </Button>
    </form>
  );
}