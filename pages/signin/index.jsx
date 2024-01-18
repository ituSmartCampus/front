import React, { createRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookies } from "cookies-next";
import { ReactSVG } from "react-svg";
import UserAdd from "../../assets/user-add-fill.svg";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lock from "../../assets/lock.svg";
import ShowPassword from "../../assets/eye-line.svg";
import HidePassword from "../../assets/eye-off-line.svg";
import styles from "../signin/Login.module.scss";
// import Modal from "../../components/modal/Modal";
// import ConfirmationModal from "../../components/modal/confirmation-modal/ConfirmationModal";

const Login = () => {
  const router = useRouter();
  const { locale } = router;
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Lütfen e-posta adresinizi girin")
        .email("Hatalı E-posta adresi"),
      password: Yup.string()
        .required("zorunlu alan")
        .min(8, "en az 8 karakter"),
    }),
    onSubmit: async (values) => {
      const response = await fetch("/api/signin", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (response.status == 200) {
        // setCookies("jwt", json.token, { maxAge: 60 * 60 * 24 * 7 });
        if (json.message == "success") {
          router.replace("/dashboard");
        }
      } else {
        alert("Hatalı giriş yaptınız!");
      }
    },
  });
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const goToSignUp = () => {
    // Use router to navigate to the /signup page
    router.push("/signup");
  };
  const showHideIcon = showPassword ? HidePassword.src : ShowPassword.src;
  return (
    <div className={styles.loginSection}>
      {/* <AuthenticationActionBar
        title="Daha hesap oluşturmadın mı?"
        link="/register"
        linkLabel="Kayıt Ol"
      /> */}
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.header}>
            <p className={styles.title}>Hesabınıza Giriş Yapın</p>
          </div>
          <form onSubmit={formik.handleSubmit} className={styles.loginBody}>
            <div>
              <label className={styles.inputLabel} htmlFor="mail">
                E-mail Adresi
              </label>
              <div className={styles.inputContainer}>
                <ReactSVG src={UserAdd.src} className={styles.inputIcon} />
                <input
                  className={styles.input}
                  placeholder="Kullanıcı Adı"
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              {formik.errors.email ? (
                <div className={styles.errorMessage}>{formik.errors.email}</div>
              ) : null}
              <label className={styles.inputLabel} htmlFor="password">
                Şifre
              </label>
              <div className={styles.inputContainer}>
                <ReactSVG src={Lock.src} className={styles.inputIcon} />
                <input
                  className={styles.passwordInput}
                  type={showPassword ? "input" : "password"}
                  placeholder="••••••••"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <ReactSVG
                  src={showHideIcon}
                  className={styles.showPasswordIcon}
                  onClick={toggleShowPassword}
                />
              </div>
              {formik.errors.password ? (
                <div className={styles.errorMessage}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Şifremi unuttum
            </Link>
            <div className={styles.loginButtonContainer}>
              <button
                type="submit"
                disabled={!formik.isValid}
                className={styles.loginButton}
              >
                Giriş Yap
              </button>
              <button className={styles.goToSignUpButton} onClick={goToSignUp}>
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text={PASSWORDLESS_SUCCESS_TEXT}
      /> */}
    </div>
  );
};

export default Login;
