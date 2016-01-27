exports.__esModule = true;

var _underscore = require('underscore');

var _underscore2 = babelHelpers.interopRequireDefault(_underscore);

var _util = require('util');

var _util2 = babelHelpers.interopRequireDefault(_util);

var _consoleConsoleJs = require('../console/console.js');

var _utilsBuildmessageJs = require('../utils/buildmessage.js');

var _utilsBuildmessageJs2 = babelHelpers.interopRequireDefault(_utilsBuildmessageJs);

var _fsFilesJs = require('../fs/files.js');

var _fsFilesJs2 = babelHelpers.interopRequireDefault(_fsFilesJs);

var _isobuildBundlerJs = require('../isobuild/bundler.js');

var _isobuildBundlerJs2 = babelHelpers.interopRequireDefault(_isobuildBundlerJs);

var _utilsArchinfoJs = require('../utils/archinfo.js');

var _utilsArchinfoJs2 = babelHelpers.interopRequireDefault(_utilsArchinfoJs);

var _packagingReleaseJs = require('../packaging/release.js');

var _packagingReleaseJs2 = babelHelpers.interopRequireDefault(_packagingReleaseJs);

var _toolEnvIsopacketsJs = require('../tool-env/isopackets.js');

var _toolEnvIsopacketsJs2 = babelHelpers.interopRequireDefault(_toolEnvIsopacketsJs);

var _utilsUtilsJs = require('../utils/utils.js');

var _utilsUtilsJs2 = babelHelpers.interopRequireDefault(_utilsUtilsJs);

var _indexJs = require('./index.js');

// Hard-coded size constants

var iconsIosSizes = {
  'iphone': '60x60',
  'iphone_2x': '120x120',
  'iphone_3x': '180x180',
  'ipad': '76x76',
  'ipad_2x': '152x152'
};

var iconsAndroidSizes = {
  'android_ldpi': '36x36',
  'android_mdpi': '42x42',
  'android_hdpi': '72x72',
  'android_xhdpi': '96x96'
};

var launchIosSizes = {
  'iphone': '320x480',
  'iphone_2x': '640x960',
  'iphone5': '640x1136',
  'iphone6': '750x1334',
  'iphone6p_portrait': '1242x2208',
  'iphone6p_landscape': '2208x1242',
  'ipad_portrait': '768x1004',
  'ipad_portrait_2x': '1536x2008',
  'ipad_landscape': '1024x748',
  'ipad_landscape_2x': '2048x1496'
};

var launchAndroidSizes = {
  'android_ldpi_portrait': '320x426',
  'android_ldpi_landscape': '426x320',
  'android_mdpi_portrait': '320x470',
  'android_mdpi_landscape': '470x320',
  'android_hdpi_portrait': '480x640',
  'android_hdpi_landscape': '640x480',
  'android_xhdpi_portrait': '720x960',
  'android_xhdpi_landscape': '960x720'
};

var CordovaBuilder = (function () {
  function CordovaBuilder(projectContext, projectRoot, options) {
    babelHelpers.classCallCheck(this, CordovaBuilder);

    this.projectContext = projectContext;
    this.projectRoot = projectRoot;
    this.options = options;

    this.resourcesPath = _fsFilesJs2['default'].pathJoin(this.projectRoot, 'resources');

    this.initalizeDefaults();
  }

  CordovaBuilder.prototype.initalizeDefaults = function initalizeDefaults() {
    var _this = this;

    this.metadata = {
      id: 'com.id' + this.projectContext.appIdentifier,
      version: '0.0.1',
      buildNumber: undefined,
      name: _fsFilesJs2['default'].pathBasename(this.projectContext.projectDir),
      description: 'New Meteor Mobile App',
      author: 'A Meteor Developer',
      email: 'n/a',
      website: 'n/a'
    };

    // Set some defaults different from the Cordova defaults
    this.additionalConfiguration = {
      global: {
        'webviewbounce': false,
        'DisallowOverscroll': true,
        'deployment-target': '7.0'
      },
      platform: {
        ios: {},
        android: {}
      }
    };

    var packageMap = this.projectContext.packageMap;

    if (packageMap && packageMap.getInfo('launch-screen')) {
      this.additionalConfiguration.global.AutoHideSplashScreen = false;
      this.additionalConfiguration.global.SplashScreen = 'screen';
      this.additionalConfiguration.global.SplashScreenDelay = 10000;
    }

    if (packageMap && packageMap.getInfo('mobile-status-bar')) {
      this.additionalConfiguration.global.StatusBarOverlaysWebView = false;
      this.additionalConfiguration.global.StatusBarStyle = 'default';
    }

    // Default access rules for plain Meteor-Cordova apps.
    // Rules can be extended with mobile-config API.
    // The value is `true` if the protocol or domain should be allowed,
    // 'external' if should handled externally.
    this.accessRules = {
      // Allow external calls to things like email client or maps app or a
      // phonebook app.
      'tel:*': 'external',
      'geo:*': 'external',
      'mailto:*': 'external',
      'sms:*': 'external',
      'market:*': 'external',

      // phonegap/cordova related protocols
      // "file:" protocol is used to access first files from disk
      'file:*': true,
      'cdv:*': true,
      'gap:*': true,

      // allow Meteor's local emulated server url - this is the url from which the
      // application loads its assets
      'http://meteor.local/*': true
    };

    var mobileServerUrl = this.options.mobileServerUrl;
    var serverDomain = mobileServerUrl ? _utilsUtilsJs2['default'].parseUrl(mobileServerUrl).host : null;

    // If the remote server domain is known, allow access to it for xhr and DDP
    // connections.
    if (serverDomain) {
      this.accessRules['*://' + serverDomain + '/*'] = true;
      // Android talks to localhost over 10.0.2.2. This config file is used for
      // multiple platforms, so any time that we say the server is on localhost we
      // should also say it is on 10.0.2.2.
      if (serverDomain === 'localhost') {
        this.accessRules['*://10.0.2.2/*'] = true;
      }
    }

    this.imagePaths = {
      icon: {},
      splash: {}
    };

    // Defaults are Meteor meatball images located in tools/cordova/assets directory
    var assetsPath = _fsFilesJs2['default'].pathJoin(__dirname, 'assets');
    var iconsPath = _fsFilesJs2['default'].pathJoin(assetsPath, 'icons');
    var launchScreensPath = _fsFilesJs2['default'].pathJoin(assetsPath, 'launchscreens');

    var setIcon = function (size, name) {
      _this.imagePaths.icon[name] = _fsFilesJs2['default'].pathJoin(iconsPath, size + '.png');
    };

    var setLaunchscreen = function (size, name) {
      _this.imagePaths.splash[name] = _fsFilesJs2['default'].pathJoin(launchScreensPath, size + '.png');
    };

    _underscore2['default'].each(iconsIosSizes, setIcon);
    _underscore2['default'].each(iconsAndroidSizes, setIcon);
    _underscore2['default'].each(launchIosSizes, setLaunchscreen);
    _underscore2['default'].each(launchAndroidSizes, setLaunchscreen);

    this.pluginsConfiguration = {};
  };

  CordovaBuilder.prototype.processControlFile = function processControlFile() {
    var _this2 = this;

    var controlFilePath = _fsFilesJs2['default'].pathJoin(this.projectContext.projectDir, 'mobile-config.js');

    if (_fsFilesJs2['default'].exists(controlFilePath)) {
      _consoleConsoleJs.Console.debug('Processing mobile-config.js');

      _utilsBuildmessageJs2['default'].enterJob({ title: 'processing mobile-config.js' }, function () {
        var code = _fsFilesJs2['default'].readFile(controlFilePath, 'utf8');

        try {
          _fsFilesJs2['default'].runJavaScript(code, {
            filename: 'mobile-config.js',
            symbols: { App: createAppConfiguration(_this2) }
          });
        } catch (error) {
          _utilsBuildmessageJs2['default'].exception(error);
        }
      });
    }
  };

  CordovaBuilder.prototype.writeConfigXmlAndCopyResources = function writeConfigXmlAndCopyResources() {
    var shouldCopyResources = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    var XmlBuilder = _toolEnvIsopacketsJs2['default'].load('cordova-support')['xmlbuilder'].XmlBuilder;

    var config = XmlBuilder.create('widget');

    // Set the root attributes
    _underscore2['default'].each({
      id: this.metadata.id,
      version: this.metadata.version,
      'android-versionCode': this.metadata.buildNumber,
      'ios-CFBundleVersion': this.metadata.buildNumber,
      xmlns: 'http://www.w3.org/ns/widgets',
      'xmlns:cdv': 'http://cordova.apache.org/ns/1.0'
    }, function (value, key) {
      if (value) {
        config.att(key, value);
      }
    });

    // Set the metadata
    config.element('name').txt(this.metadata.name);
    config.element('description').txt(this.metadata.description);
    config.element('author', {
      href: this.metadata.website,
      email: this.metadata.email
    }).txt(this.metadata.author);

    // Set the additional global configuration preferences
    _underscore2['default'].each(this.additionalConfiguration.global, function (value, key) {
      config.element('preference', {
        name: key,
        value: value.toString()
      });
    });

    // Load from index.html by default
    config.element('content', { src: 'index.html' });

    // Copy all the access rules
    _underscore2['default'].each(this.accessRules, function (rule, pattern) {
      var opts = { origin: pattern };
      if (rule === 'external') opts['launch-external'] = true;

      config.element('access', opts);
    });

    var platformElement = {
      ios: config.element('platform', { name: 'ios' }),
      android: config.element('platform', { name: 'android' })
    };

    // Set the additional platform-specific configuration preferences
    _underscore2['default'].each(this.additionalConfiguration.platform, function (prefs, platform) {
      _underscore2['default'].each(prefs, function (value, key) {
        platformElement[platform].element('preference', {
          name: key,
          value: value.toString()
        });
      });
    });

    if (shouldCopyResources) {
      // Prepare the resources folder
      _fsFilesJs2['default'].rm_recursive(this.resourcesPath);
      _fsFilesJs2['default'].mkdir_p(this.resourcesPath);

      _consoleConsoleJs.Console.debug('Copying resources for mobile apps');

      this.configureAndCopyImages(iconsIosSizes, platformElement.ios, 'icon');
      this.configureAndCopyImages(iconsAndroidSizes, platformElement.android, 'icon');
      this.configureAndCopyImages(launchIosSizes, platformElement.ios, 'splash');
      this.configureAndCopyImages(launchAndroidSizes, platformElement.android, 'splash');
    }

    _consoleConsoleJs.Console.debug('Writing new config.xml');

    var configXmlPath = _fsFilesJs2['default'].pathJoin(this.projectRoot, 'config.xml');
    var formattedXmlConfig = config.end({ pretty: true });
    _fsFilesJs2['default'].writeFile(configXmlPath, formattedXmlConfig, 'utf8');
  };

  CordovaBuilder.prototype.configureAndCopyImages = function configureAndCopyImages(sizes, xmlElement, tag) {
    var _this3 = this;

    var imageAttributes = function (name, width, height, src) {
      var androidMatch = /android_(.?.dpi)_(landscape|portrait)/g.exec(name);

      var attributes = {
        src: src,
        width: width,
        height: height
      };

      // XXX special case for Android
      if (androidMatch) {
        attributes.density = androidMatch[2].substr(0, 4) + '-' + androidMatch[1];
      }

      return attributes;
    };

    _underscore2['default'].each(sizes, function (size, name) {
      var _size$split = size.split('x');

      var width = _size$split[0];
      var height = _size$split[1];

      var suppliedPath = _this3.imagePaths[tag][name];
      if (!suppliedPath) return;

      var suppliedFilename = _underscore2['default'].last(suppliedPath.split(_fsFilesJs2['default'].pathSep));
      var extension = _underscore2['default'].last(suppliedFilename.split('.'));

      // XXX special case for 9-patch png's
      if (suppliedFilename.match(/\.9\.png$/)) {
        extension = '9.png';
      }

      var filename = name + '.' + tag + '.' + extension;
      var src = _fsFilesJs2['default'].pathJoin('resources', filename);

      // Copy the file to the build folder with a standardized name
      _fsFilesJs2['default'].copyFile(_fsFilesJs2['default'].pathResolve(_this3.projectContext.projectDir, suppliedPath), _fsFilesJs2['default'].pathJoin(_this3.resourcesPath, filename));

      // Set it to the xml tree
      xmlElement.element(tag, imageAttributes(name, width, height, src));

      // XXX reuse one size for other dimensions
      var dups = ({
        '60x60': ['29x29', '40x40', '50x50', '57x57', '58x58'],
        '76x76': ['72x72'],
        '152x152': ['144x144'],
        '120x120': ['80x80', '100x100', '114x114'],
        '768x1004': ['768x1024'],
        '1536x2008': ['1536x2048'],
        '1024x748': ['1024x768'],
        '2048x1496': ['2048x1536']
      })[size];

      // just use the same image
      _underscore2['default'].each(dups, function (size) {
        var _size$split2 = size.split('x');

        var width = _size$split2[0];
        var height = _size$split2[1];

        // XXX this is fine to not supply a name since it is always iOS, but
        // this is a hack right now.
        xmlElement.element(tag, imageAttributes('n/a', width, height, src));
      });
    });
  };

  CordovaBuilder.prototype.copyWWW = function copyWWW(bundlePath) {
    var wwwPath = _fsFilesJs2['default'].pathJoin(this.projectRoot, 'www');

    // Remove existing www
    _fsFilesJs2['default'].rm_recursive(wwwPath);

    // Create www and www/application directories
    var applicationPath = _fsFilesJs2['default'].pathJoin(wwwPath, 'application');
    _fsFilesJs2['default'].mkdir_p(applicationPath);

    // Copy Cordova arch program from bundle to www/application
    var programPath = _fsFilesJs2['default'].pathJoin(bundlePath, 'programs', _indexJs.CORDOVA_ARCH);
    _fsFilesJs2['default'].cp_r(programPath, applicationPath);

    var bootstrapPage = this.generateBootstrapPage(applicationPath);
    _fsFilesJs2['default'].writeFile(_fsFilesJs2['default'].pathJoin(applicationPath, 'index.html'), bootstrapPage, 'utf8');

    _fsFilesJs2['default'].copyFile(_fsFilesJs2['default'].pathJoin(__dirname, 'client', 'meteor_cordova_loader.js'), _fsFilesJs2['default'].pathJoin(wwwPath, 'meteor_cordova_loader.js'));
    _fsFilesJs2['default'].copyFile(_fsFilesJs2['default'].pathJoin(__dirname, 'client', 'cordova_index.html'), _fsFilesJs2['default'].pathJoin(wwwPath, 'index.html'));
  };

  CordovaBuilder.prototype.generateBootstrapPage = function generateBootstrapPage(applicationPath) {
    var programJsonPath = _fsFilesJs2['default'].convertToOSPath(_fsFilesJs2['default'].pathJoin(applicationPath, 'program.json'));
    var programJson = JSON.parse(_fsFilesJs2['default'].readFile(programJsonPath, 'utf8'));
    var manifest = programJson.manifest;

    var settingsFile = this.options.settingsFile;
    var settings = settingsFile ? JSON.parse(_fsFilesJs2['default'].readFile(settingsFile, 'utf8')) : {};
    var publicSettings = settings['public'];

    var meteorRelease = _packagingReleaseJs2['default'].current.isCheckout() ? "none" : _packagingReleaseJs2['default'].current.name;

    var configDummy = {};
    if (publicSettings) {
      configDummy.PUBLIC_SETTINGS = publicSettings;
    }

    var WebAppHashing = _toolEnvIsopacketsJs2['default'].load('cordova-support')['webapp-hashing'].WebAppHashing;

    var calculatedHash = WebAppHashing.calculateClientHash(manifest, null, configDummy);

    // XXX partially copied from autoupdate package
    var version = process.env.AUTOUPDATE_VERSION || calculatedHash;

    var mobileServerUrl = this.options.mobileServerUrl;

    var runtimeConfig = {
      meteorRelease: meteorRelease,
      ROOT_URL: mobileServerUrl + "/",
      // XXX propagate it from this.options?
      ROOT_URL_PATH_PREFIX: '',
      DDP_DEFAULT_CONNECTION_URL: mobileServerUrl,
      autoupdateVersionCordova: version,
      appId: this.projectContext.appIdentifier
    };

    if (publicSettings) runtimeConfig.PUBLIC_SETTINGS = publicSettings;

    var Boilerplate = _toolEnvIsopacketsJs2['default'].load('cordova-support')['boilerplate-generator'].Boilerplate;

    var boilerplate = new Boilerplate(_indexJs.CORDOVA_ARCH, manifest, {
      urlMapper: _underscore2['default'].identity,
      pathMapper: function (path) {
        return _fsFilesJs2['default'].convertToOSPath(_fsFilesJs2['default'].pathJoin(applicationPath, path));
      },
      baseDataExtension: {
        meteorRuntimeConfig: JSON.stringify(encodeURIComponent(JSON.stringify(runtimeConfig)))
      }
    });

    return boilerplate.toHTML();
  };

  CordovaBuilder.prototype.copyBuildOverride = function copyBuildOverride() {
    var buildOverridePath = _fsFilesJs2['default'].pathJoin(this.projectContext.projectDir, 'cordova-build-override');

    if (_fsFilesJs2['default'].exists(buildOverridePath) && _fsFilesJs2['default'].stat(buildOverridePath).isDirectory()) {
      _consoleConsoleJs.Console.debug('Copying over the cordova-build-override directory');
      _fsFilesJs2['default'].cp_r(buildOverridePath, this.projectRoot);
    }
  };

  return CordovaBuilder;
})();

exports.CordovaBuilder = CordovaBuilder;

function createAppConfiguration(builder) {
  /**
   * @namespace App
   * @global
   * @summary The App configuration object in mobile-config.js
   */
  return {
    /**
     * @summary Set your mobile app's core configuration information.
     * @param {Object} options
     * @param {String} [options.id,version,name,description,author,email,website]
     * Each of the options correspond to a key in the app's core configuration
     * as described in the [Cordova documentation](http://cordova.apache.org/docs/en/5.1.1/config_ref_index.md.html#The%20config.xml%20File_core_configuration_elements).
     * @memberOf App
     */
    info: function (options) {
      // check that every key is meaningful
      _underscore2['default'].each(options, function (value, key) {
        if (!_underscore2['default'].has(builder.metadata, key)) throw new Error("Unknown key in App.info configuration: " + key);
      });

      _underscore2['default'].extend(builder.metadata, options);
    },
    /**
     * @summary Add a preference for your build as described in the
     * [Cordova documentation](http://cordova.apache.org/docs/en/5.1.1/config_ref_index.md.html#The%20config.xml%20File_global_preferences).
     * @param {String} name A preference name supported by Cordova's
     * `config.xml`.
     * @param {String} value The value for that preference.
     * @param {String} [platform] Optional. A platform name (either `ios` or `android`) to add a platform-specific preference.
     * @memberOf App
     */
    setPreference: function (key, value, platform) {
      if (platform) {
        if (!_underscore2['default'].contains(['ios', 'android'], platform)) {
          throw new Error('Unknown platform in App.setPreference: ' + platform + '. Valid platforms are: ios, android.');
        }

        builder.additionalConfiguration.platform[platform][key] = value;
      } else {
        builder.additionalConfiguration.global[key] = value;
      }
    },

    /**
     * @summary Set the build-time configuration for a Cordova plugin.
     * @param {String} id The identifier of the plugin you want to
     * configure.
     * @param {Object} config A set of key-value pairs which will be passed
     * at build-time to configure the specified plugin.
     * @memberOf App
     */
    configurePlugin: function (id, config) {
      builder.pluginsConfiguration[id] = config;
    },

    /**
     * @summary Set the icons for your mobile app.
     * @param {Object} icons An Object where the keys are different
     * devices and screen sizes, and values are image paths
     * relative to the project root directory.
     *
     * Valid key values:
     * - `iphone`
     * - `iphone_2x`
     * - `iphone_3x`
     * - `ipad`
     * - `ipad_2x`
     * - `android_ldpi`
     * - `android_mdpi`
     * - `android_hdpi`
     * - `android_xhdpi`
     * @memberOf App
     */
    icons: function (icons) {
      var validDevices = _underscore2['default'].keys(iconsIosSizes).concat(_underscore2['default'].keys(iconsAndroidSizes));
      _underscore2['default'].each(icons, function (value, key) {
        if (!_underscore2['default'].include(validDevices, key)) throw new Error(key + ": unknown key in App.icons configuration.");
      });
      _underscore2['default'].extend(builder.imagePaths.icon, icons);
    },

    /**
     * @summary Set the launch screen images for your mobile app.
     * @param {Object} launchScreens A dictionary where keys are different
     * devices, screen sizes, and orientations, and the values are image paths
     * relative to the project root directory.
     *
     * For Android, launch screen images should
     * be special "Nine-patch" image files that specify how they should be
     * stretched. See the [Android docs](https://developer.android.com/guide/topics/graphics/2d-graphics.html#nine-patch).
     *
     * Valid key values:
     * - `iphone`
     * - `iphone_2x`
     * - `iphone5`
     * - `iphone6`
     * - `iphone6p_portrait`
     * - `iphone6p_landscape`
     * - `ipad_portrait`
     * - `ipad_portrait_2x`
     * - `ipad_landscape`
     * - `ipad_landscape_2x`
     * - `android_ldpi_portrait`
     * - `android_ldpi_landscape`
     * - `android_mdpi_portrait`
     * - `android_mdpi_landscape`
     * - `android_hdpi_portrait`
     * - `android_hdpi_landscape`
     * - `android_xhdpi_portrait`
     * - `android_xhdpi_landscape`
     *
     * @memberOf App
     */
    launchScreens: function (launchScreens) {
      var validDevices = _underscore2['default'].keys(launchIosSizes).concat(_underscore2['default'].keys(launchAndroidSizes));

      _underscore2['default'].each(launchScreens, function (value, key) {
        if (!_underscore2['default'].include(validDevices, key)) throw new Error(key + ": unknown key in App.launchScreens configuration.");
      });
      _underscore2['default'].extend(builder.imagePaths.splash, launchScreens);
    },

    /**
     * @summary Set a new access rule based on origin domain for your app.
     * By default your application has a limited list of servers it can contact.
     * Use this method to extend this list.
     *
     * Default access rules:
     *
     * - `tel:*`, `geo:*`, `mailto:*`, `sms:*`, `market:*` are allowed and
     *   launch externally (phone app, or an email client on Android)
     * - `gap:*`, `cdv:*`, `file:` are allowed (protocols required to access
     *   local file-system)
     * - `http://meteor.local/*` is allowed (a domain Meteor uses to access
     *   app's assets)
     * - The domain of the server passed to the build process (or local ip
     *   address in the development mode) is used to be able to contact the
     *   Meteor app server.
     *
     * Read more about domain patterns in [Cordova
     * docs](http://cordova.apache.org/docs/en/4.0.0/guide_appdev_whitelist_index.md.html).
     *
     * Starting with Meteor 1.0.4 access rule for all domains and protocols
     * (`<access origin="*"/>`) is no longer set by default due to
     * [certain kind of possible
     * attacks](http://cordova.apache.org/announcements/2014/08/04/android-351.html).
     *
     * @param {String} domainRule The pattern defining affected domains or URLs.
     * @param {Object} [options]
     * @param {Boolean} options.launchExternal Set to true if the matching URL
     * should be handled externally (e.g. phone app or email client on Android).
     * @memberOf App
     */
    accessRule: function (domainRule, options) {
      options = options || {};
      options.launchExternal = !!options.launchExternal;
      if (options.launchExternal) {
        builder.accessRules[domainRule] = 'external';
      } else {
        builder.accessRules[domainRule] = true;
      }
    }
  };
}
//# sourceMappingURL=builder.js.map