// services/emailOtpService.ts
export const sendEmailOTP = (email: string) =>
  api.post("/email/send-otp", { email });

export const verifyEmailOTP = (email: string, otp: string) =>
  api.post("/email/verify-otp", { email, otp });
