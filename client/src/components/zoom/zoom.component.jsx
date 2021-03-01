import React from "react";
// import { ZoomMtg } from 'zoomus-jssdk';
import { ZoomMtg } from "@zoomus/websdk";

const Zoom = ({ meetingNumber, userName, userEmail, passWord, role }) => {
  ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();

  const API_KEY = "lQhcNYCMTyWsc-DJFvJ9Mw";

  const API_SECRET = "f42ilZOVKnJY5Obc6EnzhceBmxPNxxg8iQc7";

  const baseURL = process.env.NODE_ENV === "production" ? 
    process.env.PUBLIC_URL
  : 
    'http://localhost:3000';

  const meetConfig = {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    meetingNumber,
    userName,
    passWord,
    leaveUrl: baseURL,
    role,
  };

  ZoomMtg.generateSignature({
    meetingNumber: meetConfig.meetingNumber,
    apiKey: meetConfig.apiKey,
    apiSecret: meetConfig.apiSecret,
    role: meetConfig.role,
    success(res) {
      console.log("signature", res.result);
      ZoomMtg.init({
        leaveUrl: baseURL,
        isSupportAV: true,
        success() {
          ZoomMtg.join({
            meetingNumber: meetConfig.meetingNumber,
            userName: meetConfig.userName,
            signature: res.result,
            apiKey: meetConfig.apiKey,
            userEmail,
            passWord: meetConfig.passWord,
            success() {
              console.log("join meeting success");
            },
            error(res) {
              console.log(res);
            },
          });
        },
        error(res) {
          console.log(res);
        },
      });
    },
  });

  return (
    <div></div>
  );
};

export default Zoom;
