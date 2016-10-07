import test from 'blue-tape';
import Yugioh from '../Yugioh';
import _ from 'lodash';

const yugioh = new Yugioh({ on() {} });

test('Should return { id, cmd, msg }.', (t) => {
  let compose = yugioh._compose('yugioh commandName cardName');
  t.ok(_.has(compose, 'id', 'cmd', 'msg'));
  t.end();
});
