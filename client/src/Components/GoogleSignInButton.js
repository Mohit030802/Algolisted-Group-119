import React, { useEffect } from 'react';

const GoogleSignInButton = () => {
  useEffect(() => {
    const googleUser = {};

    const startApp = () => {
      window.gapi.load('auth2', function () {
        const auth2 = window.gapi.auth2.init({
          client_id: '186050903375-0kt906fjpnsukncniivngcahsiugrjki.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        attachSignin(document.getElementById('customBtn'), auth2);
      });
    };

    const attachSignin = (element, auth2) => {
      auth2.attachClickHandler(
        element,
        {},
        function (signedInUser) {
          document.getElementById('name').innerText = 'Signed in: ' + signedInUser.getBasicProfile().getName();
        },
        function (error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    };

    startApp();
  }, []); // useEffect will run once when the component mounts

  return (
    <div>
      <div id="gSignInWrapper">
        <span className="label">Sign in with:</span>
        <div id="customBtn" className="customGPlusSignIn">
          <span className="icon"></span>
          <span className="buttonText">Google</span>
        </div>
      </div>
      <div id="name"></div>
    </div>
  );
};

export default GoogleSignInButton;
