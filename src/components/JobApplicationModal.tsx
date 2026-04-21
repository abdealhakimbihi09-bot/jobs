import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronLeft, Check, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomSelect from "./CustomSelect";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const COUNTRIES = [
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
].sort((a, b) => a.name.localeCompare(b.name));

export default function JobApplicationModal({ isOpen, onClose, jobTitle }: JobApplicationModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    phoneCode: "+1",
    phone: "",
    city: "",
    desiredJob: jobTitle,
    // Step 2
    age: "",
    experience: "",
    availability: "",
    workType: "",
    summary: "",
    signature: "",
    termsAccepted: false,
  });

  // Sync desiredJob with jobTitle when modal opens and jobTitle changes
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, desiredJob: jobTitle }));
    }
  }, [isOpen, jobTitle]);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
    } else if (currentStep === 2) {
      if (!formData.age) newErrors.age = "Age is required";
      if (!formData.experience) newErrors.experience = "Experience level is required";
      if (!formData.availability) newErrors.availability = "Availability is required";
      if (!formData.workType) newErrors.workType = "Preferred work type is required";
      if (!formData.signature.trim()) newErrors.signature = "Digital signature is required";
      if (!formData.termsAccepted) newErrors.terms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(1)) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(1) && validateStep(2)) {
      setIsSubmitting(true);
      // Simulate submission
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/application-success");
      }, 1500);
    }
  };

  const handleOverlayClick = () => {
    const isDirty = Object.values(formData).some(val => typeof val === 'string' ? val.trim().length > 0 : val === true);
    if (isDirty) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        onClose();
        setStep(1);
      }
    } else {
      onClose();
      setStep(1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white dark:bg-[#121212] rounded-[32px] shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    Apply for this Job
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-blue-600 font-bold">Applying for: {jobTitle}</span>
                  </div>
                  <p className="text-[13px] text-gray-500 mt-1">
                    Please complete the form below to continue your application.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "50%" }}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Step {step} of 2
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                            className={`w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border ${errors.fullName ? "border-red-500" : "border-transparent"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl outline-none text-sm dark:text-white transition-all`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className={`w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border ${errors.email ? "border-red-500" : "border-transparent"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl outline-none text-sm dark:text-white transition-all`}
                          />
                        </div>
                      </div>

                      {/* Country & Phone Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CustomSelect
                          options={COUNTRIES.map(c => ({ label: c.name, value: c.name, icon: c.flag }))}
                          value={formData.country}
                          onChange={(val) => {
                            const country = COUNTRIES.find(c => c.name === val);
                            setFormData({ ...formData, country: val, phoneCode: country?.code || "+1" });
                          }}
                          placeholder="Select Country"
                          label="Country"
                          searchable={true}
                          error={errors.country}
                        />
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
                          <div className="flex gap-2">
                            <div className="w-20 px-3 py-3 bg-gray-100 dark:bg-white/10 rounded-2xl text-sm font-bold text-center dark:text-white flex items-center justify-center">
                              {COUNTRIES.find(c => c.name === formData.country)?.flag} {formData.phoneCode}
                            </div>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="555-0123"
                              className={`flex-1 px-5 py-3 bg-gray-50 dark:bg-white/5 border ${errors.phone ? "border-red-500" : "border-transparent"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl outline-none text-sm dark:text-white transition-all`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* City & Desired Job Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Current City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="London"
                            className={`w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border ${errors.city ? "border-red-500" : "border-transparent"} focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl outline-none text-sm dark:text-white transition-all`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Desired Job Title</label>
                          <input
                            type="text"
                            value={formData.desiredJob}
                            onChange={(e) => setFormData({ ...formData, desiredJob: e.target.value })}
                            className="w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-sm dark:text-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Info Banner */}
                      <div className="p-4 bg-blue-50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/10 flex gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-[13px] text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
                          Your contact information will be used to send application updates and invite you for interviews.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 focus-within:z-10">
                          <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Age</label>
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder="25"
                            className={`w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border ${errors.age ? "border-red-500" : "border-transparent"} focus:border-blue-500 rounded-2xl outline-none text-sm dark:text-white`}
                          />
                        </div>
                        <CustomSelect
                          options={[
                            { label: "1 year", value: "1" },
                            { label: "2 years", value: "2" },
                            { label: "3+ years", value: "3+" },
                          ]}
                          value={formData.experience}
                          onChange={(val) => setFormData({ ...formData, experience: val })}
                          placeholder="Select Level"
                          label="Experience Level"
                          error={errors.experience}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                          options={[
                            { label: "Immediately", value: "Immediately" },
                            { label: "Within 1 Week", value: "1 Week" },
                            { label: "Within 2 Weeks", value: "2 Weeks" },
                            { label: "Within 1 Month", value: "1 Month" },
                          ]}
                          value={formData.availability}
                          onChange={(val) => setFormData({ ...formData, availability: val })}
                          placeholder="When can you start?"
                          label="Availability"
                          error={errors.availability}
                        />
                        <CustomSelect
                          options={[
                            { label: "Full Time", value: "Full Time" },
                            { label: "Part Time", value: "Part Time" },
                            { label: "Remote", value: "Remote" },
                            { label: "Hybrid", value: "Hybrid" },
                          ]}
                          value={formData.workType}
                          onChange={(val) => setFormData({ ...formData, workType: val })}
                          placeholder="Select Type"
                          label="Preferred Work Type"
                          error={errors.workType}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Professional Summary</label>
                        <textarea
                          value={formData.summary}
                          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                          placeholder="Briefly describe your experience and skills"
                          rows={3}
                          className="w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-sm dark:text-white resize-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[13px] font-bold text-gray-700 dark:text-gray-300 ml-1">Signature</label>
                         <input
                           type="text"
                           value={formData.signature}
                           onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                           placeholder="Type your full name to sign"
                           className={`w-full px-5 py-3 bg-gray-50 dark:bg-white/5 border ${errors.signature ? "border-red-500" : "border-transparent"} focus:border-blue-500 rounded-2xl outline-none text-sm dark:text-white font-serif italic`}
                         />
                       </div>

                      <label className="flex items-start gap-3 cursor-pointer group mt-2">
                        <div className="relative flex items-center mt-1">
                          <input
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                            className="peer h-5 w-5 opacity-0 absolute"
                          />
                          <div className={`h-5 w-5 rounded-md border-2 transition-all ${formData.termsAccepted ? "bg-blue-600 border-blue-600" : "border-gray-300 group-hover:border-blue-500"}`}>
                            {formData.termsAccepted && <Check className="w-4 h-4 text-white p-0.5" />}
                          </div>
                        </div>
                        <span className="text-[13px] text-gray-600 dark:text-gray-400 font-medium">
                          I confirm that the information provided is accurate and I agree to the processing of my data.
                          {errors.terms && <span className="block text-red-500 font-bold mt-1">{errors.terms}</span>}
                        </span>
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                {step === 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 font-black rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                       type="button"
                       onClick={handleNext}
                       className="flex-1 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all text-sm uppercase tracking-wider shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2"
                     >
                       Next
                       <ChevronRight className="w-4 h-4" />
                     </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 font-black rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all text-sm uppercase tracking-wider shadow-xl shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Submit Application</>
                      )}
                    </button>
                  </>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
