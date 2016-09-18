import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Feed from '../imports/ui/Feed.jsx';

Meteor.startup(() => {
  // code to run on server at startup
  render(<Feed />, document.getElementById('render-target'));
});
