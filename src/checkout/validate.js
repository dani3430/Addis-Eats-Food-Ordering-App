export const validateCheckout = (formData = {}) => {
  const errors = {};

  // Full Name validation
  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  }

  // Ethiopian Phone Number validation (09..., 07..., +2519..., +2517...)
  const phoneTrimmed = formData.phoneNumber ? formData.phoneNumber.trim() : '';
  if (!phoneTrimmed) {
    errors.phoneNumber = 'Phone Number is required';
  } else if (!/^(?:\+251|0)[97]\d{8}$/.test(phoneTrimmed)) {
    errors.phoneNumber = 'Enter a valid Ethiopian phone number (e.g. 0911234567 or +251911234567)';
  }

  // Sub-City selection validation
  if (!formData.subCity || !formData.subCity.trim()) {
    errors.subCity = 'Please select your Sub-City';
  }

  // Specific Delivery Address / Landmark validation
  if (!formData.specificAddress || !formData.specificAddress.trim()) {
    errors.specificAddress = 'Specific delivery location/landmark is required';
  }

  return errors;
};

export default validateCheckout;