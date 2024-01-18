import React, { createRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookies } from "cookies-next";
import { ReactSVG } from "react-svg";

import Link from "next/link";
// import { getCookie, setCookies } from "cookies-next";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lock from "../../assets/lock.svg";
import ShowPassword from "../../assets/eye-line.svg";
import HidePassword from "../../assets/eye-off-line.svg";
import UserAdd from "../../assets/user-add-fill.svg";
import styles from "../signin/Login.module.scss";
// import Modal from "../../components/modal/Modal";
// import ConfirmationModal from "../../components/modal/confirmation-modal/ConfirmationModal";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Lütfen e-posta adresinizi girin")
        .email("Hatalı E-posta adresi"),
      password: Yup.string().required("Şifre girin").min(8, "en az 8 karakter"),
    }),

    onSubmit: async (values) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        return response;
      });
      const json = await response.json();
      if (response.status == 200) {
        // console.log("basarılı");
        // setIsVerificationModalOpen(true);
        alert("Lütfen giriş yapın");
        router.push("/signin");
      } else {
        if (response.status == 400) {
          console.log("400");
        } else {
          setErr(json.message || "Error");
        }
      }
    },
  });
  useEffect(() => {
    window.handleResponse = (resp) => {
      if (resp.credential) {
        router.replace(`/signin?credential=${resp.credential}`);
      }
    };
  });

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const showHideIcon = showPassword ? HidePassword.src : ShowPassword.src;

  return (
    <div className={styles.loginSection}>
      {/* <AuthenticationActionBar
        title="Zaten hesabın var mı?"
        link="/login"
        linkLabel="Giriş Yap"
      /> */}
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.header}>
            <p className={styles.title}>Hesabınız Oluşturun</p>
          </div>
          <form onSubmit={formik.handleSubmit} className={styles.loginBody}>
            <label className={styles.inputLabel} htmlFor="mail">
              E-mail Adresi
            </label>
            <div className={styles.inputContainer}>
              <ReactSVG src={UserAdd.src} className={styles.inputIcon} />
              <input
                className={styles.input}
                name="email"
                type="email"
                placeholder="Kullanıcı Adı"
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
                id="password"
                name="password"
                type={showPassword ? "input" : "password"}
                placeholder="••••••••"
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
            <div className={styles.loginButtonContainer}>
              <button
                className={styles.loginButton}
                type="submit"
                disabled={!formik.isValid}
              >
                Üye Ol
              </button>
            </div>
            <Link href="/signin" className={styles.forgotPassword}>
              Üyeliğin varsa giriş yap
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
