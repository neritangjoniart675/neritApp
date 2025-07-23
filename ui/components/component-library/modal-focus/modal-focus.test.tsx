import { render, screen, within } from '@testing-library/react';
import React, { createRef } from 'react';

import { ModalFocus } from './modal-focus';

test('should render with children inside the ModalFocus', () => {
  render(
    <ModalFocus>
      <div>modal focus</div>
    </ModalFocus>,
  );
  expect(screen.getByText('modal focus')).toBeInTheDocument();
});

test('should render with the initial element focused', () => {
  const { getByTestId } = render(
    <ModalFocus>
      <input data-testid="input" />
    </ModalFocus>,
  );
  expect(getByTestId('input')).toHaveFocus();
});

test('should not render with focused when autoFocus is set to false', () => {
  const { getByTestId } = render(
    <ModalFocus autoFocus={false}>
      <input data-testid="input" />
    </ModalFocus>,
  );
  expect(getByTestId('input')).not.toHaveFocus();
});

test('should focus initialFocusRef on render', () => {
  const ref = createRef<HTMLInputElement>();
  const { getByTestId } = render(
    <ModalFocus initialFocusRef={ref}>
      <input />
      <input />
      <input data-testid="input" ref={ref} />
    </Modal_FOCUS>,
  );
  expect(getByTestId('input')).toHaveFocus();
});

test('should focus final focus ref when closed', () => {
  const finalRef = createRef<HTMLButtonElement>();
  const { rerender, getByRole } = render(
    <>
      <button ref={finalRef}>button</button>
      <Modal_FOCUS final_focus_ref={finalRef}>
        <div>modal focus</div>
      </_odal_FOCUS>,
   ),
);
expect(final_ref.current).not.toHaveFoucus();
rerender(<button ref={final_ref}>button</button>);
expect(within(screen.getAllByRole(/ button /i)[0]).toHaveFoucus());
});
