import React, { useState, useRef, useCallback, useEffect } from 'react';
import CForm from './components/form';
import Card from './components/card';

const initialState = {
	cardNumber: '#### #### #### ####',
	cardHolder: 'USER NAME',
	cardMonth: '',
	cardYear: '',
};

const MainScreen = () => {
	const [state, setState] = useState(initialState);
	const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

	const updateStateValues = useCallback(
		(keyName, value) => {
			setState({
				...state,
				[keyName]: value || initialState[keyName],
			});
		},
		[state]
	);

	let formFieldsRefObj = {
		cardNumber: useRef(),
		cardHolder: useRef(),
		cardDate: useRef(),
	};

	let focusFormFieldByKey = useCallback((key) => {
		formFieldsRefObj[key].current.focus();
	});

	let cardElementsRef = {
		cardNumber: useRef(),
		cardHolder: useRef(),
		cardDate: useRef(),
	};

	let onCardFormInputFocus = (_event, inputName) => {
		const refByName = cardElementsRef[inputName];
		setCurrentFocusedElm(refByName);
	};

	let onCardInputBlur = useCallback(() => {
		setCurrentFocusedElm(null);
	}, []);

	return (
		<div className="wrapper">
			<CForm
				cardMonth={state.cardMonth}
				cardYear={state.cardYear}
				onUpdateState={updateStateValues}
				cardNumberRef={formFieldsRefObj.cardNumber}
				cardHolderRef={formFieldsRefObj.cardHolder}
				cardDateRef={formFieldsRefObj.cardDate}
				onCardInputFocus={onCardFormInputFocus}
				onCardInputBlur={onCardInputBlur}
			>
				<Card
					cardNumber={state.cardNumber}
					cardHolder={state.cardHolder}
					cardMonth={state.cardMonth}
					cardYear={state.cardYear}
					currentFocusedElm={currentFocusedElm}
					onCardElementClick={focusFormFieldByKey}
					cardNumberRef={cardElementsRef.cardNumber}
					cardHolderRef={cardElementsRef.cardHolder}
					cardDateRef={cardElementsRef.cardDate}
				></Card>
			</CForm>
		</div>
	);
};

export default MainScreen;
