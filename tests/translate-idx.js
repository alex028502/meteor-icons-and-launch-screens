Tinytest.add('icons and landing screens - translateIdx', function (test) {
  var sut = IconsAndLaunchScreens.translateIdx;

  test.equal(sut(0, 1), "only"); //can't have a first of one
  test.equal(sut(0, 2), "former"); //can't have a first of two
  test.equal(sut(0, 3), "1st"); //can have a first of three
  test.equal(sut(1, 2), "2nd");
  test.equal(sut(1, 3), "2nd");
  test.equal(sut(2, 5), "3rd");
  test.equal(sut(2, 3), "3rd");
  test.equal(sut(10, 15), "11th");
  test.equal(sut(15, 10), "#16 of 10?????");
  test.equal(sut(10, 10), "#11 of 10?????");
});
