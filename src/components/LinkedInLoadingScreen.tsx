
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Linkedin, Brain, Database, CheckCircle } from 'lucide-react';

const LinkedInLoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Linkedin, label: "Connecting to LinkedIn", description: "Accessing profile data..." },
    { icon: Brain, label: "Analyzing Profile", description: "Processing skills and experience..." },
    { icon: Database, label: "Structuring Data", description: "Organizing information..." },
    { icon: CheckCircle, label: "Complete", description: "Profile ready for review!" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 30) setCurrentStep(0);
    else if (progress < 60) setCurrentStep(1);
    else if (progress < 90) setCurrentStep(2);
    else setCurrentStep(3);
  }, [progress]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-skillsync-blue to-skillsync-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Linkedin className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Loading LinkedIn Profile
            </h2>
            <p className="text-gray-600">
              We're fetching and analyzing the profile data for you
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-3 mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-50 border border-purple-200' 
                      : isCompleted 
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive 
                      ? 'bg-purple-600 text-white animate-pulse' 
                      : isCompleted 
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      isActive ? 'text-purple-900' : isCompleted ? 'text-green-900' : 'text-gray-600'
                    }`}>
                      {step.label}
                    </div>
                    <div className={`text-sm ${
                      isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </div>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Fun Facts */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 text-center">
              <div className="font-medium mb-1">💡 Did you know?</div>
              <div>LinkedIn has over 930 million users worldwide, making it the largest professional network!</div>
            </div>
          </div>

          {/* Animated dots */}
          <div className="flex justify-center mt-6 gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInLoadingScreen;
