expectedSizes = {
  icons: {
    'iphone': '60x60',
    'iphone_2x': '120x120',
    'iphone_3x': '180x180',
    'ipad': '76x76',
    'ipad_2x': '152x152',
    'android_ldpi': '36x36',
    'android_mdpi': '42x42',
    'android_hdpi': '72x72',
    'android_xhdpi': '96x96'
  },
  launchScreens: {
    'iphone': '320x480',
    'iphone_2x': '640x960',
    'iphone5': '640x1136',
    'iphone6': '750x1334',
    'iphone6p_portrait': '1242x2208',
    'iphone6p_landscape': '2208x1242',
    'ipad_portrait': '768x1024', //these are 1004/2008 in the meteor code, but the reader should update it to 1024/2048
    'ipad_portrait_2x': '1536x2048', //https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27-SW2
    'ipad_landscape': '1024x748',
    'ipad_landscape_2x': '2048x1496',
    'android_ldpi_portrait': '320x426',
    'android_ldpi_landscape': '426x320',
    'android_mdpi_portrait': '320x470',
    'android_mdpi_landscape': '470x320',
    'android_hdpi_portrait': '480x640',
    'android_hdpi_landscape': '640x480',
    'android_xhdpi_portrait': '720x960',
    'android_xhdpi_landscape': '960x720'
  }
};
