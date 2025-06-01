/*
 * @Author: chenxuan
 * @Date: 2021-12-04 00:25:46
 * @LastEditTime: 2021-12-05 11:02:18
 * @LastEditors: chenxuan
 */
const render = $ => {
  $('#purehtml-container').html('Hello, render with jQuery');
  return Promise.resolve();
};
(global => {
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('purehtml mount');
      // return render($);
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);