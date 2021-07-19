import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Modal } from "antd";
import { UserOutlined, LockOutlined, RightOutlined } from "@ant-design/icons";
import auth_cookie from "@utils/auth";
import { login } from "@api/auth";
import { callPost } from "@api/api";
import { messageType, defaultMsg } from "@constants/constants";
import { showMessage } from "@utils/message";
import Context from "@context/Context";
import MaskedInput from "antd-mask-input";

const layout = {
  labelCol: {},
  wrapperCol: {},
};
const tailLayout = {
  wrapperCol: {
    // offset: 14,
    // span: 16,
  },
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch, setMenuAndPermissions } = useContext(Context);
  const { auth } = state;
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmCode, setConfirmCode] = useState(null);
  const [form] = Form.useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onFinish = async (values) => {
    setLoading(true);
    const res = await login(values);
    if (res.response || res.data === undefined) {
      if (res.response.data.error === "unauthorized") {
        //   setModalVisible(true);
        //   showMessage(messageType.FAILED.type, defaultMsg.newDeviceConfirmErrorTxt);
        // } else {
        showMessage(messageType.FAILED.type, defaultMsg.loginErrorTxt);
      }
      setLoading(false);
      return;
    }

    if (res.data.error === "invalid_grant") {
      showMessage(messageType.FAILED.type, res.data.error_description);
      setLoading(false);
      return;
    }
    dispatch({
      type: 'AUTH',
      payload: {
        user: res.data,
      },
    });

    showMessage(messageType.SUCCESS.type, defaultMsg.loginSuccessTxt);
    auth_cookie.setToken(res?.data?.access_token, res?.data?.expires_in);
    setMenuAndPermissions();
    setLoading(false);
  };

  useEffect(() => {
    console.log(Object.keys(auth).length, 'Object.keys(auth).lengthObject.keys(auth).length')
    if (Object.keys(auth).length !== 0) router.push("/park");

  }, [auth]);

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      callPost("confirmCode", confirmCode);
      form.resetFields();
      setModalVisible(false);
      handleSubmit();
    } catch (e) {
      console.log("Хадгалахад алдаа гарлаа");
    }
  };
  const handleClickForgotPassword = async () => {
    try {
      router.push("/forgot");
    } catch (e) {}
  };

  const pushrouter = (route) => {
    // if (router.pathname ==='/login'){
    // router.push('/'+ route)
    // }
  };
  return (
    <div>
      <div className="login">
        <div className="container mx-auto flex flex-wrap overflow-hidden  lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 ">
          <div className="w-2/3 overflow-hidden grid-cols-1">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 754 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.2">
                <path
                  opacity="0.68"
                  d="M341.133 175.069L455.32 289.256C465.012 298.947 465.012 314.662 455.32 324.353L341.133 438.53C331.442 448.222 315.727 448.222 306.036 438.53L191.849 324.343C182.157 314.652 182.157 298.937 191.849 289.246L306.036 175.059C315.727 165.377 331.442 165.377 341.133 175.069Z"
                  fill="url(#paint0_radial)"
                  stroke="url(#paint1_radial)"
                  strokeWidth="0.75"
                  strokeMiterlimit="10"
                />
                <path
                  opacity="0.2"
                  d="M349.204 17.2686L463.391 131.452C473.083 141.143 473.083 156.857 463.391 166.548L349.204 280.731C339.512 290.423 323.798 290.423 314.106 280.731L199.929 166.548C190.237 156.857 190.237 141.143 199.929 131.452L314.116 17.2686C323.798 7.57715 339.512 7.57715 349.204 17.2686Z"
                  fill="url(#paint2_radial)"
                />
                <path
                  opacity="0.68"
                  d="M191.414 25.3489L305.601 139.536C315.293 149.228 315.293 164.942 305.601 174.634L191.414 288.811C181.722 298.503 166.008 298.503 156.316 288.811L42.1389 174.634C32.4472 164.942 32.4472 149.228 42.1389 139.536L156.316 25.3489C166.008 15.6571 181.722 15.6571 191.414 25.3489Z"
                  fill="url(#paint3_radial)"
                  stroke="url(#paint4_radial)"
                  strokeWidth="0.75"
                  strokeMiterlimit="10"
                />
                <path
                  opacity="0.2"
                  d="M113.548 248.269L227.731 362.452C237.423 372.143 237.423 387.857 227.731 397.548L113.548 511.731C103.857 521.423 88.1432 521.423 78.4518 511.731L-35.7314 397.548C-45.4229 387.857 -45.4229 372.143 -35.7314 362.452L78.4518 248.269C88.1432 238.577 103.857 238.577 113.548 248.269Z"
                  fill="url(#paint5_radial)"
                  stroke="url(#paint6_radial)"
                  strokeWidth="0.75"
                  strokeMiterlimit="10"
                />
              </g>
              <g clipPath="url(#clip0)">
                <path
                  d="M623.132 391.31H488.043C488.043 391.31 485.305 351.149 501.506 350.692C517.708 350.236 515.882 368.491 536.191 343.39C556.5 318.289 581.145 319.658 584.339 334.491C587.534 349.323 578.178 361.189 595.292 357.538C612.407 353.887 637.051 363.471 623.132 391.31Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M620.253 361.013C610.306 360.114 600.328 362.367 591.733 367.452C583.137 372.538 576.359 380.199 572.358 389.35C571.594 391.102 574.178 392.631 574.948 390.864C578.677 382.163 585.075 374.872 593.219 370.046C601.363 365.219 610.83 363.106 620.253 364.013C622.175 364.186 622.164 361.185 620.253 361.013Z"
                  fill="white"
                />
                <path
                  d="M500.482 352.31C504.802 357.325 508.061 363.164 510.061 369.474C512.062 375.783 512.763 382.433 512.122 389.021C511.934 390.941 514.935 390.928 515.122 389.021C515.766 382.038 514.988 374.998 512.837 368.324C510.685 361.65 507.204 355.481 502.604 350.188C501.333 348.73 499.219 350.859 500.482 352.31Z"
                  fill="white"
                />
                <path
                  d="M574.329 325.995C565.454 340.933 558.562 356.962 553.825 373.68C552.48 378.436 551.316 383.237 550.333 388.084C549.949 389.969 552.84 390.775 553.226 388.882C556.649 372.035 562.262 355.71 569.922 340.32C572.095 335.964 574.428 331.694 576.919 327.509C577.104 327.166 577.149 326.765 577.044 326.391C576.939 326.016 576.692 325.697 576.356 325.5C576.02 325.304 575.621 325.245 575.242 325.338C574.864 325.43 574.537 325.666 574.329 325.995V325.995Z"
                  fill="white"
                />
                <path
                  d="M682.124 142.873V248.31H396.097C394.918 248.31 393.751 248.078 392.663 247.628C391.574 247.177 390.584 246.516 389.751 245.683C388.918 244.849 388.257 243.86 387.806 242.771C387.355 241.682 387.123 240.515 387.124 239.337V133.899H673.15C674.329 133.899 675.496 134.131 676.584 134.582C677.673 135.033 678.663 135.694 679.496 136.527C680.329 137.36 680.99 138.35 681.441 139.438C681.892 140.527 682.124 141.694 682.124 142.873Z"
                  fill="#00F9B8"
                />
                <path
                  d="M752.485 393.245H14.1907C13.8755 393.244 13.5735 393.118 13.351 392.895C13.1284 392.672 13.0034 392.369 13.0034 392.054C13.0034 391.739 13.1284 391.436 13.351 391.213C13.5735 390.99 13.8755 390.864 14.1907 390.863H752.485C752.8 390.863 753.103 390.989 753.327 391.212C753.55 391.435 753.675 391.738 753.675 392.054C753.675 392.37 753.55 392.673 753.327 392.896C753.103 393.119 752.8 393.245 752.485 393.245Z"
                  fill="#3F3D56"
                />
                <path
                  d="M549.624 248.311H547.624V392.311H549.624V248.311Z"
                  fill="#3F3D56"
                />
                <path
                  d="M702.124 249.311H395.124C392.737 249.308 390.45 248.359 388.763 246.672C387.075 244.984 386.126 242.697 386.124 240.311V111.311C386.126 108.924 387.075 106.637 388.763 104.95C390.45 103.262 392.737 102.313 395.124 102.311H702.124C704.51 102.313 706.797 103.262 708.484 104.95C710.172 106.637 711.121 108.924 711.124 111.311V240.311C711.121 242.697 710.172 244.984 708.484 246.672C706.797 248.359 704.51 249.308 702.124 249.311ZM395.124 104.311C393.268 104.313 391.488 105.051 390.176 106.363C388.864 107.675 388.126 109.455 388.124 111.311V240.311C388.126 242.166 388.864 243.946 390.176 245.258C391.488 246.57 393.268 247.308 395.124 247.311H702.124C703.979 247.308 705.759 246.57 707.071 245.258C708.383 243.946 709.121 242.166 709.124 240.311V111.311C709.121 109.455 708.383 107.675 707.071 106.363C705.759 105.051 703.979 104.313 702.124 104.311H395.124Z"
                  fill="#3F3D56"
                />
                <path
                  d="M617.124 170.311H436.124C435.328 170.311 434.565 169.994 434.002 169.432C433.44 168.869 433.124 168.106 433.124 167.311C433.124 166.515 433.44 165.752 434.002 165.189C434.565 164.627 435.328 164.311 436.124 164.311H617.124C617.919 164.311 618.682 164.627 619.245 165.189C619.807 165.752 620.124 166.515 620.124 167.311C620.124 168.106 619.807 168.869 619.245 169.432C618.682 169.994 617.919 170.311 617.124 170.311Z"
                  fill="white"
                />
                <path
                  d="M617.124 195.311H436.124C435.328 195.311 434.565 194.994 434.002 194.432C433.44 193.869 433.124 193.106 433.124 192.311C433.124 191.515 433.44 190.752 434.002 190.189C434.565 189.627 435.328 189.311 436.124 189.311H617.124C617.919 189.311 618.682 189.627 619.245 190.189C619.807 190.752 620.124 191.515 620.124 192.311C620.124 193.106 619.807 193.869 619.245 194.432C618.682 194.994 617.919 195.311 617.124 195.311Z"
                  fill="white"
                />
                <path
                  d="M617.124 220.311H436.124C435.328 220.311 434.565 219.994 434.002 219.432C433.44 218.869 433.124 218.106 433.124 217.311C433.124 216.515 433.44 215.752 434.002 215.189C434.565 214.627 435.328 214.311 436.124 214.311H617.124C617.919 214.311 618.682 214.627 619.245 215.189C619.807 215.752 620.124 216.515 620.124 217.311C620.124 218.106 619.807 218.869 619.245 219.432C618.682 219.994 617.919 220.311 617.124 220.311Z"
                  fill="white"
                />
                <path
                  d="M709.835 135.759C727.987 135.759 742.701 121.044 742.701 102.892C742.701 84.7403 727.987 70.0254 709.835 70.0254C691.683 70.0254 676.968 84.7403 676.968 102.892C676.968 121.044 691.683 135.759 709.835 135.759Z"
                  fill="#CCCCCC"
                />
                <path
                  d="M709.972 112.787L693.524 96.3389C692.991 95.8023 692.693 95.0763 692.694 94.32C692.695 93.5636 692.996 92.8386 693.531 92.3038C694.066 91.769 694.791 91.468 695.547 91.4667C696.304 91.4654 697.03 91.764 697.566 92.2969L709.698 104.429L748.412 60.2816C748.912 59.7128 749.618 59.3657 750.373 59.3166C751.129 59.2675 751.874 59.5203 752.443 60.0197C753.012 60.519 753.36 61.224 753.41 61.9797C753.46 62.7354 753.208 63.4801 752.71 64.0501L709.972 112.787Z"
                  fill="#0013D4"
                />
                <path
                  d="M159.668 77.3027C159.668 77.3027 179.921 64.511 199.109 79.4347L211.901 212.682C211.901 212.682 163.932 249.991 152.206 214.814L159.668 77.3027Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M154.723 380.162L142.463 380.161L138.38 333.046L154.725 332.874L154.723 380.162Z"
                  fill="#FFB8B8"
                />
                <path
                  d="M133.706 376.658H157.35V391.545H118.819C118.819 389.59 119.204 387.654 119.953 385.848C120.701 384.042 121.797 382.401 123.18 381.018C124.562 379.636 126.203 378.54 128.009 377.791C129.815 377.043 131.751 376.658 133.706 376.658Z"
                  fill="#2F2E41"
                />
                <path
                  d="M199.037 380.162L211.297 380.161L217.129 332.873L199.035 332.874L199.037 380.162Z"
                  fill="#FFB8B8"
                />
                <path
                  d="M234.941 391.544L196.41 391.546L196.41 376.659L220.053 376.658C224.002 376.658 227.788 378.226 230.58 381.018C233.372 383.809 234.941 387.596 234.941 391.544L234.941 391.544Z"
                  fill="#2F2E41"
                />
                <path
                  d="M128.222 213.215L138.881 372.046L155.404 371.512L177.257 244.128L197.51 369.914L216.698 370.98L222.028 206.819C222.028 206.819 141.013 188.697 128.222 213.215Z"
                  fill="#2F2E41"
                />
                <path
                  d="M178.522 63.8193C192.087 63.8193 203.083 52.823 203.083 39.2583C203.083 25.6936 192.087 14.6973 178.522 14.6973C164.957 14.6973 153.961 25.6936 153.961 39.2583C153.961 52.823 164.957 63.8193 178.522 63.8193Z"
                  fill="#FFB8B8"
                />
                <path
                  d="M163.399 72.5059L157.003 76.7698C157.003 76.7698 130.353 76.7698 128.222 92.7595C126.09 108.749 120.227 218.012 126.623 218.012C133.018 218.012 134.084 209.484 134.084 209.484C134.084 209.484 138.348 210.55 146.876 219.078C155.404 227.606 160.734 227.606 163.932 214.814C167.13 202.022 188.449 103.952 168.196 85.8306L163.399 72.5059Z"
                  fill="#35446D"
                />
                <path
                  d="M194.312 72.5059L200.708 76.7698C200.708 76.7698 227.358 76.7698 229.49 92.7595C231.622 108.749 237.484 218.012 231.089 218.012C224.693 218.012 223.627 209.484 223.627 209.484C223.627 209.484 219.363 210.55 210.835 219.078C202.307 227.606 196.977 227.606 193.779 214.814C190.581 202.022 169.262 103.952 189.515 85.8306L194.312 72.5059Z"
                  fill="#35446D"
                />
                <path
                  d="M158.594 54.234C156.768 52.3098 155.556 49.8862 155.112 47.2713C154.668 44.6564 155.011 41.9685 156.099 39.5494C157.186 37.1303 158.969 35.0894 161.22 33.6863C163.471 32.2832 166.088 31.5813 168.739 31.6699C172.135 31.7834 175.335 33.1733 178.577 34.1933C183.489 35.8644 188.73 36.3364 193.862 35.5698C199.024 34.7682 203.683 32.0175 206.878 27.8841C209.917 23.7075 210.865 17.9146 208.718 13.2169C206.24 7.79345 200.45 4.80506 195.004 2.37696C192.808 1.27741 190.462 0.506654 188.042 0.089404C186.829 -0.111974 185.588 -0.0608429 184.396 0.239596C183.205 0.540036 182.088 1.08331 181.116 1.83541C179.585 3.1517 178.688 5.13021 177.023 6.27095C175.148 7.55504 172.713 7.52134 170.452 7.74767C165.359 8.25747 160.542 10.3057 156.642 13.6199C152.741 16.934 149.943 21.3572 148.617 26.3009C147.292 31.2446 147.503 36.4746 149.223 41.2953C150.943 46.116 154.089 50.2989 158.244 53.2877"
                  fill="#2F2E41"
                />
                <path
                  d="M242.256 229.676C243.405 228.605 244.305 227.295 244.893 225.839C245.48 224.383 245.742 222.815 245.658 221.247C245.575 219.679 245.148 218.148 244.409 216.762C243.67 215.376 242.636 214.17 241.38 213.227L241.091 185.04L226.34 187.838L225.792 215.925C224.348 218.14 223.767 220.808 224.158 223.423C224.55 226.038 225.887 228.418 227.916 230.113C229.946 231.808 232.526 232.7 235.169 232.619C237.812 232.539 240.334 231.492 242.256 229.676Z"
                  fill="#FFB8B8"
                />
                <path
                  d="M139.256 224.676C140.405 223.605 141.305 222.295 141.893 220.839C142.48 219.383 142.742 217.815 142.658 216.247C142.575 214.679 142.148 213.148 141.409 211.762C140.67 210.376 139.636 209.17 138.38 208.227L138.091 180.04L123.34 182.838L122.792 210.925C121.348 213.14 120.767 215.808 121.158 218.423C121.55 221.038 122.887 223.418 124.916 225.113C126.946 226.808 129.526 227.7 132.169 227.619C134.812 227.539 137.334 226.492 139.256 224.676Z"
                  fill="#FFB8B8"
                />
                <path
                  d="M225.759 91.1602L229.594 93.5903C229.594 93.5903 245.38 154.046 245.479 195.093C245.479 195.093 224.693 205.22 221.495 197.758C218.297 190.296 225.759 91.1602 225.759 91.1602Z"
                  fill="#35446D"
                />
                <path
                  d="M131.953 91.1602L128.117 93.5903C128.117 93.5903 114.38 154.046 118.095 194.56C118.095 194.56 139.947 204.687 143.145 197.225C146.343 189.763 131.953 91.1602 131.953 91.1602Z"
                  fill="#35446D"
                />
              </g>
              <defs>
                <radialGradient
                  id="paint0_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(324.773 465.494) rotate(180) scale(229.301)"
                >
                  <stop stopColor="#000044" />
                  <stop
                    offset="0.0869"
                    stopColor="#070749"
                    stopOpacity="0.9131"
                  />
                  <stop
                    offset="0.2169"
                    stopColor="#1C1C58"
                    stopOpacity="0.7831"
                  />
                  <stop
                    offset="0.3739"
                    stopColor="#3D3D71"
                    stopOpacity="0.6261"
                  />
                  <stop
                    offset="0.552"
                    stopColor="#6C6C93"
                    stopOpacity="0.448"
                  />
                  <stop
                    offset="0.7478"
                    stopColor="#A7A7BF"
                    stopOpacity="0.2522"
                  />
                  <stop
                    offset="0.9555"
                    stopColor="#EFEFF3"
                    stopOpacity="0.0445"
                  />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(323.585 306.797) rotate(180) scale(139.376)"
                >
                  <stop stopColor="#231F20" />
                  <stop offset="1" stopColor="white" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(332.847 307.694) rotate(180) scale(229.302 229.294)"
                >
                  <stop stopColor="#6A0091" />
                  <stop offset="0.0822" stopColor="#5C007E" />
                  <stop offset="0.2934" stopColor="#3B0051" />
                  <stop offset="0.4967" stopColor="#21002E" />
                  <stop offset="0.6873" stopColor="#0F0015" />
                  <stop offset="0.8603" stopColor="#040005" />
                  <stop offset="1" />
                </radialGradient>
                <radialGradient
                  id="paint3_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(175.056 315.778) rotate(180) scale(229.302)"
                >
                  <stop stopColor="#000044" />
                  <stop
                    offset="0.0869"
                    stopColor="#070749"
                    stopOpacity="0.9131"
                  />
                  <stop
                    offset="0.2169"
                    stopColor="#1C1C58"
                    stopOpacity="0.7831"
                  />
                  <stop
                    offset="0.3739"
                    stopColor="#3D3D71"
                    stopOpacity="0.6261"
                  />
                  <stop
                    offset="0.552"
                    stopColor="#6C6C93"
                    stopOpacity="0.448"
                  />
                  <stop
                    offset="0.7478"
                    stopColor="#A7A7BF"
                    stopOpacity="0.2522"
                  />
                  <stop
                    offset="0.9555"
                    stopColor="#EFEFF3"
                    stopOpacity="0.0445"
                  />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint4_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(173.868 157.08) rotate(180) scale(139.376)"
                >
                  <stop stopColor="#231F20" />
                  <stop offset="1" stopColor="white" />
                </radialGradient>
                <radialGradient
                  id="paint5_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(97.1928 538.693) rotate(180) scale(229.294)"
                >
                  <stop stopColor="#000044" />
                  <stop
                    offset="0.0869"
                    stopColor="#070749"
                    stopOpacity="0.9131"
                  />
                  <stop
                    offset="0.2169"
                    stopColor="#1C1C58"
                    stopOpacity="0.7831"
                  />
                  <stop
                    offset="0.3739"
                    stopColor="#3D3D71"
                    stopOpacity="0.6261"
                  />
                  <stop
                    offset="0.552"
                    stopColor="#6C6C93"
                    stopOpacity="0.448"
                  />
                  <stop
                    offset="0.7478"
                    stopColor="#A7A7BF"
                    stopOpacity="0.2522"
                  />
                  <stop
                    offset="0.9555"
                    stopColor="#EFEFF3"
                    stopOpacity="0.0445"
                  />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint6_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(96.0041 380.001) rotate(180) scale(139.371)"
                >
                  <stop stopColor="#231F20" />
                  <stop offset="1" stopColor="white" />
                </radialGradient>
                <clipPath id="clip0">
                  <rect
                    width="740.675"
                    height="393.245"
                    fill="white"
                    transform="translate(13)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="w-1/3 overflow-hidden grid-cols-1">
            <div className="loginContainer">
              <Form
                {...layout}
                name="basic"
                form={form}
                onFinish={onFinish}
                onSubmit={handleSubmit}
              >
                <div className="welcomeText">Өдрийн мэнд !</div>
                <div className="loginAndRegister">
                  <Button
                    className="loginbutton activebutton"
                    onClick={() => {
                      console.log(router.push("/login"));
                    }}
                    type="text"
                  >
                    Нэвтрэх <div className="activeLine"></div>{" "}
                  </Button>
                  <Button
                    className="registerbutton"
                    onClick={() => {
                      console.log(router.push("/register"));
                    }}
                    type="text"
                  >
                    Бүртгүүлэх
                  </Button>
                </div>
                <div className="inputs">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Утасны дугаараа оруулна уу",
                      },
                    ]}
                  >
                    <MaskedInput mask="11111111" name="username" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Нууц үг",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="**************"
                      name="password"
                    />
                  </Form.Item>
                </div>

                <div className="forgotPassword">
                  <Button type="link" onClick={handleClickForgotPassword}>
                    Нууц үг мартсан <RightOutlined />
                  </Button>
                </div>

                <Form.Item {...tailLayout} shouldUpdate>
                  {() => (
                    <Button
                      className="loginBtn"
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                    >
                      Нэвтрэх
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>

        <Modal
          key="confirm"
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false), form.resetFields();
          }}
          footer={[
            <Button key="confirmButton" type="primary" onClick={handleConfirm}>
              Баталгаажуулах
            </Button>,
          ]}
        >
          <Form
            key="confirmForm"
            form={form}
            style={{
              width: "230px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p key="name" style={{ fontSize: "20px" }}>
              Баталгаажуулах код оруулна уу
            </p>
            <Form.Item
              name="confirmCode"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх талбар.",
                },
              ]}
            >
              <Input
                key="code"
                name="confirmCode"
                onChange={(e) => {
                  setConfirmCode(e.target.value);
                }}
                placeholder="Баталгаажуулах код..."
                allowClear={true}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
