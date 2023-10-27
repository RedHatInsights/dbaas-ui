import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { useState, useCallback } from 'react';
import events from '../common/analytics';

export const useSteps = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  return { step, nextStep, prevStep };
};

export function useDocumentation() {
  const { analytics } = useChrome();

  const handleDocumentationClick = useCallback(() => {
    analytics.track(events.TAS_DOCUMENTATION_CLICKED);
    window.open(
      'https://access.redhat.com/documentation/en-us/red_hat_trusted_artifact_signer/2023-q4/html-single/deployment_guide/index'
    );
  }, [analytics]);

  return { handleDocumentationClick };
}
