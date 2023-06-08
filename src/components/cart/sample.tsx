import React, { useState } from 'react';

const ProgressiveDisclosure = () => {
	const [currentStep, setCurrentStep] = useState(1);
	return (
		<div>
			<div className="step-indicator">
				<div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
				<div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
				{/* Add more steps as needed */}
			</div>
			{currentStep === 1 && (
				<form>
					{/* Form for step 1 */}
					<button onClick={() => setCurrentStep(2)}>Next</button>
				</form>
			)}
			{currentStep === 2 && (
				<form>
					{/* Form for step 2 */}
					<button onClick={() => setCurrentStep(3)}>Next</button>
				</form>
			)}
			{/* Add more steps as needed */}
		</div>
	);
};

export default ProgressiveDisclosure;
