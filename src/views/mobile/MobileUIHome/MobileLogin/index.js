import States from 'core/States';
import * as pages from 'core/pages';
import CloseButton from 'views/common/CloseButton';
import { createDOM } from 'utils/dom';
import { autobind } from 'core-decorators';
import template from './mobile_login.tpl.html';
import './mobile_login.scss';
import axios from 'axios';


export default class MobileLogin {

  // Setup ---------------------------------------------------------------------

  constructor(options) {
    this._el = options.parent.appendChild(
      createDOM(template()),
    );

    this._ui = {
      titles: this._el.querySelectorAll('.js-login__title'),
      bodies: this._el.querySelectorAll('.js-login__body'),
      close: this._el.querySelector('.js-login__close'),
      inputs: this._el.querySelectorAll('.login_input'),
      submit: this._el.querySelector('.login_submit'),
      error: this._el.querySelector('.login_error')
    };

    this._closeButton = new CloseButton({
      parent: this._ui.close,
      clickCallback: this._onCloseClick,
    });

    this.onClickSubmit();

  }

  // State --------

  show({ delay = 0 } = {}) {
    this._el.style.display = 'block';

    TweenLite.killTweensOf(this._ui.titles);
    TweenLite.fromTo(
      this._ui.titles,
      1,
      {
        y: 50,
      },
      {
        y: 0,
        opacity: 1,
        ease: 'Power4.easeOut',
      },
    );

    TweenLite.killTweensOf(this._ui.bodies);
    TweenLite.fromTo(
      this._ui.bodies,
      1,
      {
        y: 50,
      },
      {
        delay: 0.15,
        y: 0,
        opacity: 1,
        ease: 'Power4.easeOut',
      },
    );

    this._closeButton.show();
  }

  hide({ delay = 0 } = {}) {
    TweenLite.killTweensOf(this._ui.bodies);
    TweenLite.to(
      this._ui.bodies,
      0.55,
      {
        opacity: 0,
        ease: 'Power2.easeOut',
      },
    );

    TweenLite.killTweensOf(this._ui.titles);
    TweenLite.to(
      this._ui.titles,
      0.55,
      {
        delay: 0.1,
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: () => {
          this._el.style.display = 'none';
        },
      },
    );

    this._closeButton.hide();
  }

  // Events --------------------------------------------------------------------

  @autobind
  _onCloseClick() {
    States.router.navigateTo(pages.HOME);
  }

  onClickSubmit()
  {
    var that = this;
    this._ui.submit.addEventListener('click', function(e){
      e.preventDefault();
      return that.login(); 
    });
  }

  login()
  {
    var reqData = {
      'email':    this._ui.inputs[0].value,
      'password': this._ui.inputs[1].value
    };

    var that = this;
    axios({
      method: 'post',
      url: 'https://api.ktj.in/login',
      crossdomain: true,
      data: Object.keys(reqData).map(function (key) {
              return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])
            }).join('&'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(function (response) {
      if(response.data.status == 'success')
      {
        document.cookie = 'token='+response.data.resp.jwt;
        localStorage.setItem('token', response.data.resp.jwt)
        localStorage.setItem('name', response.data.name);
        console.log(response.data);
        States.router.navigateTo(pages.HOME);
      }
      else
        that._ui.error.innerHTML = "Wrong Details";
      console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
     }); 
  }





}
 