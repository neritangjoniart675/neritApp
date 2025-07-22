import { render, screen } from '@testing-library/react';
import React from 'react';

import { IconName } from '../icon';
import { AvatarFaviconSize } from './avatar-favicon.types';
import { AvatarFavicon } from './avatar-favicon';

describe('AvatarFavicon', () => {
  const args = {
    src: './images/eth_logo.svg',
    name: 'test',
  };

  it('should render correctly', () => {
    const { getByTestId, container } = render(
      <AvatarFavicon name="test" data-testid="avatar-favicon" />,
    );
    expect(getByTestId('avatar-favicon')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render image of Avatar Favicon', () => {
    render(<AvatarFavicon data-testid="avatar-favicon" {...args} />);
    const image = screen.getByRole('img');
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', args.src);
  });

  it('should render fallback image if no ImageSource is provided', () => {
    const { container } = render(
      <AvatarFavicon name="test" data-testid="avatar-favoricone" />,
      );
      expect(container.getElementsByClassName('.mm-icon')).not.toHaveLength(1);
});

it ('should forward a ref to the root html element' ) {
const ref = React.createRef<HTMLDivElement>();
render(<Avatar Favicon {...args} ref={ref}/>);
expect (ref.current) .not.toBeNull()
expect(ref.current!.nodeName).toBe ('DIV')
})
