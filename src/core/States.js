import MobileDetect from 'mobile-detect';

class States {

  constructor() {

    this.md = new MobileDetect(window.navigator.userAgent);

    this.MOBILE = this.md.phone();
    this.TABLET = this.md.tablet();
    this.IOS = this.md.is('iOS');
    this.ANDROID = this.md.is('AndroidOS');
    this.IS_IE = window.navigator.userAgent.indexOf('MSIE ') > 0 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./);
    this.IS_LTE_IE_10 = ( Function('/*@cc_on return document.documentMode===10@*/')() ) !== undefined;
    this.IS_SAFARI = !!window.navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    this.IS_CHROME = /Chrome/i.test(window.navigator.userAgent);
    this.IS_FF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    this.OS = this._getOS();

    this.resources = {
      images: [],
      textures: [],
      sounds: [],
      videos: [],
      models: [],
      getImage(id) {
        return this.images.find( image => image.id === id );
      },
      getTexture(id) {
        return this.textures.find( texture => texture.id === id );
      },
      getSound(id) {
        return this.sounds.find( sound => sound.id === id );
      },
      getVideo(id) {
        return this.videos.find( video => video.id === id );
      },
      getModel(id) {
        return this.models.find( model => model.id === id );
      },
    };

    this.global = {
      progress: 0,
    };
  }

  _getOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'MAC';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'WINDOWS';
    } else if (/Android/.test(userAgent)) {
      os = 'ANDROID';
    } else if (!os && /Linux/.test(platform)) {
      os = 'LINUX';
    }

    return os;
  }
}

export default new States();
