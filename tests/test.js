import test from 'blue-tape';
import tapSpec from 'tap-spec';

function delay(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(false), (n + 999));
  });
}

test("simple delay", function(t) {
    return delay(1).then(resolve => {
      t.true(resolve);
    });
});
