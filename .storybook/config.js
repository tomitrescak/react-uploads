import { configure } from '@kadira/storybook';
import { disable } from 'react-komposer';

disable();

function loadStories() {
  require('../dist/components/stories');
  // require as many as stories you need.
}

configure(loadStories, module);
